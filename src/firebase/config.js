// Firebase is loaded on demand (only when saving a result) so the SDK stays out
// of the main bundle and is never initialized during build-time prerendering.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let dbPromise;

export const getDb = () => {
  dbPromise ??= Promise.all([import('firebase/app'), import('firebase/firestore')]).then(
    ([{ initializeApp }, { getFirestore }]) => getFirestore(initializeApp(firebaseConfig))
  );
  return dbPromise;
};

// Function to save test result to Firebase
export const saveTestResult = async ({ name, personalityType, answers, percentages, questionVersion }) => {
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
    timestamp: serverTimestamp(),
    createdAt: new Date().toISOString()
  });
  return docRef.id;
};
