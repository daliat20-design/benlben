import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db, auth } from '../firebase';

export interface SoulRegistration {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  age: number;
  maritalStatus: string;
  childrenAges: string[];
  trainsAtStudio: 'כן' | 'לא';
  joinReasons: string[];
  joinReasonsOther: string;
  curiousTopics: string[];
  personalGift: string;
  heardFrom: string;
  heardFromOther: string;
  allergies: string;
  termsAccepted: boolean;
  photoConsent: boolean;
  stayInTouchConsent: boolean;
  paid?: boolean;
  paidAt?: string;
  submittedAt: string;
  source: string;
}

const LOCAL_STORAGE_KEY = 'bein_levein_soul_registrations_cache';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function logFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid ?? null,
      email: auth.currentUser?.email ?? null,
      emailVerified: auth.currentUser?.emailVerified ?? null,
    },
    operationType,
    path,
  };
  console.warn('Firestore SoulRegistration Error:', JSON.stringify(errInfo));
}

export function getLocalSoulRegistrations(): SoulRegistration[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading soul registrations from localStorage:', e);
    return [];
  }
}

export function saveLocalSoulRegistrations(items: SoulRegistration[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn('Error saving soul registrations to localStorage:', e);
  }
}

export async function saveSoulRegistration(
  data: Omit<SoulRegistration, 'id'>
): Promise<{ id: string; savedLocally: boolean; savedFirestore: boolean }> {
  const localId = 'local_soul_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
  const cleanPayload: Omit<SoulRegistration, 'id'> = {
    fullName: data.fullName.trim().slice(0, 120),
    phone: data.phone.trim().slice(0, 50),
    email: data.email.trim().slice(0, 150),
    age: Math.round(Number(data.age)),
    maritalStatus: data.maritalStatus.trim().slice(0, 80),
    childrenAges: data.childrenAges.slice(0, 10),
    trainsAtStudio: data.trainsAtStudio,
    joinReasons: data.joinReasons.slice(0, 10),
    joinReasonsOther: (data.joinReasonsOther || '').trim().slice(0, 500),
    curiousTopics: data.curiousTopics.slice(0, 2),
    // Preserve full unmodified personalGift text (up to schema bound) for welcome kit card
    personalGift: data.personalGift.slice(0, 5000),
    heardFrom: data.heardFrom.trim().slice(0, 100),
    heardFromOther: (data.heardFromOther || '').trim().slice(0, 500),
    allergies: (data.allergies || '').trim().slice(0, 500),
    termsAccepted: Boolean(data.termsAccepted),
    photoConsent: Boolean(data.photoConsent),
    stayInTouchConsent: Boolean(data.stayInTouchConsent),
    paid: Boolean(data.paid),
    ...(data.paidAt ? { paidAt: data.paidAt.slice(0, 100) } : {}),
    submittedAt: data.submittedAt || new Date().toISOString(),
    source: (data.source || 'אמצע החיים - אימון לנשמה (רעות)').slice(0, 100),
  };

  const newEntry: SoulRegistration = {
    id: localId,
    ...cleanPayload,
  };

  // 1. Save locally first
  const existing = getLocalSoulRegistrations();
  saveLocalSoulRegistrations([newEntry, ...existing]);

  let firestoreSaved = false;
  let finalId = localId;

  // 2. Save to Firestore
  try {
    const docRef = await addDoc(collection(db, 'soul_registrations'), cleanPayload);
    firestoreSaved = true;
    finalId = docRef.id;

    const updated = getLocalSoulRegistrations().map((item) =>
      item.id === localId ? { ...item, id: finalId } : item
    );
    saveLocalSoulRegistrations(updated);
  } catch (err) {
    logFirestoreError(err, OperationType.CREATE, 'soul_registrations');
  }

  return { id: finalId, savedLocally: true, savedFirestore: firestoreSaved };
}

export async function updateSoulRegistrationPayment(
  id: string,
  paid: boolean
): Promise<{ paid: boolean; paidAt: string }> {
  const paidAt = paid ? new Date().toISOString() : '';
  const current = getLocalSoulRegistrations();
  saveLocalSoulRegistrations(
    current.map((item) => (item.id === id ? { ...item, paid, paidAt } : item))
  );

  if (!id.startsWith('local_soul_')) {
    try {
      await updateDoc(doc(db, 'soul_registrations', id), { paid, paidAt });
    } catch (err) {
      logFirestoreError(err, OperationType.UPDATE, `soul_registrations/${id}`);
    }
  }
  return { paid, paidAt };
}

export async function deleteSoulRegistration(id: string): Promise<boolean> {
  const current = getLocalSoulRegistrations();
  saveLocalSoulRegistrations(current.filter((item) => item.id !== id));

  if (!id.startsWith('local_soul_')) {
    try {
      await deleteDoc(doc(db, 'soul_registrations', id));
    } catch (err) {
      logFirestoreError(err, OperationType.DELETE, `soul_registrations/${id}`);
    }
  }
  return true;
}

export function subscribeToSoulRegistrations(
  onUpdate: (items: SoulRegistration[]) => void
): () => void {
  onUpdate(getLocalSoulRegistrations());

  let unsubscribeFirestore = () => {};

  try {
    const q = query(collection(db, 'soul_registrations'), orderBy('submittedAt', 'desc'));
    unsubscribeFirestore = onSnapshot(
      q,
      (snapshot) => {
        const remoteItems: SoulRegistration[] = [];
        snapshot.forEach((d) => {
          remoteItems.push({ id: d.id, ...(d.data() as Omit<SoulRegistration, 'id'>) });
        });

        const localCurrent = getLocalSoulRegistrations();
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

        saveLocalSoulRegistrations(merged);
        onUpdate(merged);
      },
      (err) => {
        logFirestoreError(err, OperationType.GET, 'soul_registrations');
        onUpdate(getLocalSoulRegistrations());
      }
    );
  } catch (err) {
    logFirestoreError(err, OperationType.GET, 'soul_registrations');
    onUpdate(getLocalSoulRegistrations());
  }

  return () => {
    try {
      unsubscribeFirestore();
    } catch {}
  };
}
