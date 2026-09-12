import { collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export interface IntakeSubmission {
  id: string;
  fullName: string;
  phone: string;
  city?: string;
  ageRange: string;
  motivation: string;
  stopFeelingAlone?: string;
  periodCharacteristics?: string[];
  topicsOfInterest?: string[];
  topicDetails?: Record<string, string>;
  expectations: string;
  notes?: string;
  personalWish: string;
  submittedAt: string;
}

const LOCAL_STORAGE_KEY = 'mwm_intake_submissions_cache';

export function getLocalSubmissions(): IntakeSubmission[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading from localStorage:', e);
    return [];
  }
}

export function saveLocalSubmissions(submissions: IntakeSubmission[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(submissions));
  } catch (e) {
    console.warn('Error writing to localStorage:', e);
  }
}

export async function saveIntakeSubmission(data: Omit<IntakeSubmission, 'id'>): Promise<{ id: string; savedLocally: boolean; savedFirestore: boolean }> {
  const localId = 'local_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
  const newSubmission: IntakeSubmission = {
    id: localId,
    ...data
  };

  // 1. Save locally first (guarantees zero data loss even on Firestore quota limits)
  const existing = getLocalSubmissions();
  saveLocalSubmissions([newSubmission, ...existing]);

  let firestoreSaved = false;
  let finalId = localId;

  // 2. Try saving to Firestore without blocking if quota is exceeded
  try {
    const docRef = await addDoc(collection(db, 'mwm_intake_forms'), {
      ...data,
      submittedAt: data.submittedAt || new Date().toISOString()
    });
    firestoreSaved = true;
    finalId = docRef.id;

    // Update local cache with real firestore ID
    const updated = getLocalSubmissions().map(item => item.id === localId ? { ...item, id: finalId } : item);
    saveLocalSubmissions(updated);
  } catch (err: any) {
    console.warn('Firestore write warning (using reliable local backup):', err?.message || err);
  }

  return { id: finalId, savedLocally: true, savedFirestore: firestoreSaved };
}

export async function deleteIntakeSubmission(id: string): Promise<boolean> {
  // 1. Remove from local storage
  const current = getLocalSubmissions();
  const filtered = current.filter(item => item.id !== id);
  saveLocalSubmissions(filtered);

  // 2. Remove from Firestore if not purely a local id
  if (!id.startsWith('local_')) {
    try {
      await deleteDoc(doc(db, 'mwm_intake_forms', id));
    } catch (err: any) {
      console.warn('Firestore delete warning:', err?.message || err);
    }
  }

  return true;
}

export function subscribeToIntakeSubmissions(onUpdate: (items: IntakeSubmission[]) => void): () => void {
  // Initial immediate dispatch from local cache
  const localItems = getLocalSubmissions();
  onUpdate(localItems);

  let unsubscribeFirestore = () => {};

  try {
    const q = query(collection(db, 'mwm_intake_forms'), orderBy('submittedAt', 'desc'));
    
    unsubscribeFirestore = onSnapshot(
      q,
      (snapshot) => {
        const remoteItems: IntakeSubmission[] = [];
        snapshot.forEach((d) => {
          remoteItems.push({ id: d.id, ...d.data() } as IntakeSubmission);
        });

        // Merge remote and local (prefer remote, keep unique local unsynced)
        const localCurrent = getLocalSubmissions();
        const remoteIds = new Set(remoteItems.map(r => r.id));
        
        // Match by identical name, phone and submission timestamp or local ID
        const unmergedLocal = localCurrent.filter(loc => {
          if (remoteIds.has(loc.id)) return false;
          // check if already represented in remote
          const match = remoteItems.find(r => r.fullName === loc.fullName && r.phone === loc.phone);
          return !match;
        });

        const merged = [...remoteItems, ...unmergedLocal];
        merged.sort((a, b) => (b.submittedAt || '').localeCompare(a.submittedAt || ''));

        saveLocalSubmissions(merged);
        onUpdate(merged);
      },
      (error) => {
        console.warn('Firestore subscription warning (falling back to local cache):', error?.message || error);
        // On quota exceeded or network issue, maintain local items
        onUpdate(getLocalSubmissions());
      }
    );
  } catch (err) {
    console.warn('Could not setup Firestore onSnapshot:', err);
    onUpdate(getLocalSubmissions());
  }

  return () => {
    try {
      unsubscribeFirestore();
    } catch (e) {}
  };
}
