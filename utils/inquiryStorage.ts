import { collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export interface InquirySubmission {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  programs: string[];
  notes?: string;
  submittedAt: string;
  source?: string;
}

const LOCAL_STORAGE_KEY = 'bein_levein_interest_inquiries_cache';

export function getLocalInquiries(): InquirySubmission[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading inquiries from localStorage:', e);
    return [];
  }
}

export function saveLocalInquiries(inquiries: InquirySubmission[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(inquiries));
  } catch (e) {
    console.warn('Error saving inquiries to localStorage:', e);
  }
}

export async function saveInquiry(
  data: Omit<InquirySubmission, 'id'>
): Promise<{ id: string; savedLocally: boolean; savedFirestore: boolean }> {
  const localId = 'local_inq_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
  const newInquiry: InquirySubmission = {
    id: localId,
    ...data,
    submittedAt: data.submittedAt || new Date().toISOString(),
  };

  // 1. Save locally first (guarantees zero data loss even on offline or quota limits)
  const existing = getLocalInquiries();
  saveLocalInquiries([newInquiry, ...existing]);

  let firestoreSaved = false;
  let finalId = localId;

  // 2. Save to Firestore
  try {
    const docRef = await addDoc(collection(db, 'inquiries'), {
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      programs: data.programs || [],
      notes: data.notes || '',
      submittedAt: newInquiry.submittedAt,
      source: data.source || 'website',
    });
    firestoreSaved = true;
    finalId = docRef.id;

    // Update local cache with Firestore ID
    const updated = getLocalInquiries().map((item) =>
      item.id === localId ? { ...item, id: finalId } : item
    );
    saveLocalInquiries(updated);
  } catch (err: any) {
    console.warn('Firestore inquiry write warning (local backup preserved):', err?.message || err);
  }

  return { id: finalId, savedLocally: true, savedFirestore: firestoreSaved };
}

export async function deleteInquiry(id: string): Promise<boolean> {
  // 1. Remove from local storage
  const current = getLocalInquiries();
  const filtered = current.filter((item) => item.id !== id);
  saveLocalInquiries(filtered);

  // 2. Remove from Firestore if not purely local
  if (!id.startsWith('local_inq_')) {
    try {
      await deleteDoc(doc(db, 'inquiries', id));
    } catch (err: any) {
      console.warn('Firestore inquiry delete warning:', err?.message || err);
    }
  }

  return true;
}

export function subscribeToInquiries(onUpdate: (items: InquirySubmission[]) => void): () => void {
  // Immediate local dispatch
  const localItems = getLocalInquiries();
  onUpdate(localItems);

  let unsubscribeFirestore = () => {};

  try {
    const q = query(collection(db, 'inquiries'), orderBy('submittedAt', 'desc'));
    unsubscribeFirestore = onSnapshot(
      q,
      (snapshot) => {
        const remoteItems: InquirySubmission[] = [];
        snapshot.forEach((d) => {
          remoteItems.push({ id: d.id, ...d.data() } as InquirySubmission);
        });

        // Merge remote and unique unsynced local items
        const localCurrent = getLocalInquiries();
        const remoteIds = new Set(remoteItems.map((r) => r.id));

        const unmergedLocal = localCurrent.filter((loc) => {
          if (remoteIds.has(loc.id)) return false;
          const match = remoteItems.find(
            (r) => r.fullName === loc.fullName && r.phone === loc.phone && r.submittedAt === loc.submittedAt
          );
          return !match;
        });

        const merged = [...remoteItems, ...unmergedLocal];
        merged.sort((a, b) => (b.submittedAt || '').localeCompare(a.submittedAt || ''));

        saveLocalInquiries(merged);
        onUpdate(merged);
      },
      (error) => {
        console.warn('Firestore inquiries subscription warning (falling back to cache):', error?.message || error);
        onUpdate(getLocalInquiries());
      }
    );
  } catch (err) {
    console.warn('Could not setup Firestore onSnapshot for inquiries:', err);
    onUpdate(getLocalInquiries());
  }

  return () => {
    try {
      unsubscribeFirestore();
    } catch (e) {}
  };
}
