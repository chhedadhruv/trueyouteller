import { getDb } from './config';

// Firestore helpers for the link-based social features (mirror, guess, room, duo).
// Each top-level document has a random, unguessable id that acts as the share link;
// friends add entries to its subcollection. Rules (firestore.rules) only allow
// creating well-formed docs and reading by exact path: no listing, editing or deleting.

const ID_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

// 12 random base62 characters (~71 bits), from the browser's crypto RNG.
export const newId = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return Array.from(bytes, (b) => ID_ALPHABET[b % ID_ALPHABET.length]).join('');
};

const firestore = () => import('firebase/firestore');

// Creates kind/{newId} and returns the id.
export const createShared = async (kind, data) => {
  const [db, { doc, setDoc, serverTimestamp }] = await Promise.all([getDb(), firestore()]);
  const id = newId();
  await setDoc(doc(db, kind, id), { ...data, createdAt: serverTimestamp() });
  return id;
};

// Reads kind/{id}; null if it doesn't exist.
export const getShared = async (kind, id) => {
  const [db, { doc, getDoc }] = await Promise.all([getDb(), firestore()]);
  const snap = await getDoc(doc(db, kind, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

// Adds kind/{id}/{sub}/{entryId}. Pass entryId to use a fixed id (e.g. the duo partner).
export const addEntry = async (kind, id, sub, data, entryId = newId()) => {
  const [db, { doc, setDoc, serverTimestamp }] = await Promise.all([getDb(), firestore()]);
  await setDoc(doc(db, kind, id, sub, entryId), { ...data, createdAt: serverTimestamp() });
  return entryId;
};

// Live list of kind/{id}/{sub}, oldest first. Returns an unsubscribe function.
export const watchEntries = (kind, id, sub, onChange, onError) => {
  let unsubscribe = () => {};
  let cancelled = false;
  Promise.all([getDb(), firestore()])
    .then(([db, { collection, onSnapshot, orderBy, query }]) => {
      if (cancelled) return;
      unsubscribe = onSnapshot(
        query(collection(db, kind, id, sub), orderBy('createdAt')),
        (snap) => onChange(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
        onError
      );
    })
    .catch(onError);
  return () => {
    cancelled = true;
    unsubscribe();
  };
};
