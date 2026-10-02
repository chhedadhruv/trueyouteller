// Firebase is loaded on demand (only when saving a result) so the SDK stays out
// of the main bundle and is never initialized during build-time prerendering.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

let appPromise;
let dbPromise;

// One Firebase app shared by Firestore and Analytics.
export const getFirebaseApp = () => {
  appPromise ??= import('firebase/app').then(({ initializeApp }) => initializeApp(firebaseConfig));
  return appPromise;
};

// Optional bot protection: with VITE_RECAPTCHA_SITE_KEY set, Firestore requests carry an
// App Check token (turn on enforcement in Firebase console > App Check to require it).
const startAppCheck = async (app) => {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  if (!siteKey) return;
  const { initializeAppCheck, ReCaptchaV3Provider } = await import('firebase/app-check');
  initializeAppCheck(app, { provider: new ReCaptchaV3Provider(siteKey), isTokenAutoRefreshEnabled: true });
};

export const getDb = () => {
  dbPromise ??= Promise.all([getFirebaseApp(), import('firebase/firestore')]).then(
    async ([app, { getFirestore, connectFirestoreEmulator }]) => {
      await startAppCheck(app);
      const db = getFirestore(app);
      // Local testing against `firebase emulators:start --only firestore`, e.g. VITE_FIRESTORE_EMULATOR=localhost:8085
      const emulator = import.meta.env.VITE_FIRESTORE_EMULATOR;
      if (emulator) {
        const [host, port] = emulator.split(':');
        connectFirestoreEmulator(db, host, Number(port));
      }
      return db;
    }
  );
  return dbPromise;
};

// Function to save test result to Firebase
export const saveTestResult = async ({ name, personalityType, answers, percentages, questionVersion, mode }) => {
  const [db, { collection, addDoc, serverTimestamp }] = await Promise.all([
    getDb(),
    import('firebase/firestore'),
  ]);
  const docRef = await addDoc(collection(db, 'personalityTestResults'), {
    name: name,
    personalityType: personalityType.code,
    personalityName: personalityType.name,
    answers: answers,
    percentages: percentages,
    questionVersion: questionVersion,
    mode: mode,
    timestamp: serverTimestamp(),
    createdAt: new Date().toISOString()
  });
  return docRef.id;
};
