import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// ⚠️ IMPORTANT: Replace these values with your actual config from the Firebase Console ⚠️
const firebaseConfig = {
  apiKey: "AIzaSyBYTTiMhUoZP-J4KmIHS70tZouWT_YahpI",
  authDomain: "resume-analyzer-950f3.firebaseapp.com",
  databaseURL: "https://resume-analyzer-950f3-default-rtdb.firebaseio.com",
  projectId: "resume-analyzer-950f3",
  storageBucket: "resume-analyzer-950f3.firebasestorage.app",
  messagingSenderId: "225227746812",
  appId: "1:225227746812:web:7f6989e504be84e3ef1679",
  measurementId: "G-46QY22K0Q1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};
