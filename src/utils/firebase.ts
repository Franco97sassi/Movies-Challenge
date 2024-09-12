import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:  "AIzaSyCbSZLRJT-yLSsXLFddd6ROl25e0DA9ZLI",
  authDomain:  "challenge-43a73.firebaseapp.com",
  projectId: "challenge-43a73",
  storageBucket: "challenge-43a73.appspot.com",
  messagingSenderId: "710081149576",
  appId: "1:710081149576:web:d367dc16e520c64b14fd3d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);