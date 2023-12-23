import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB8CVIEuRV0Mwds5jofMFYeKENDuOGW5Lo",
    authDomain: "abhi-blog-bc502.firebaseapp.com",
    projectId: "abhi-blog-bc502",
    storageBucket: "abhi-blog-bc502.appspot.com",
    messagingSenderId: "281832597698",
    appId: "1:281832597698:web:792a4e5bad5ff3e8ce335b",
    measurementId: "G-14WHV87G6C"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };