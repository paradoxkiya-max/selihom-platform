import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB7IHPP6DIPRJQkDAZSxbODuDKYbinL5XM",
  authDomain: "selihom-b2729.firebaseapp.com",
  projectId: "selihom-b2729",
  storageBucket: "selihom-b2729.firebasestorage.app",
  messagingSenderId: "486787054575",
  appId: "1:486787054575:web:4f6f303e728ae6fd26d41a",
  measurementId: "G-YY874TYND6"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

let analytics: any = null;
if (typeof window !== "undefined") {
  isSupported().then((supported: boolean) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, storage, analytics };
