import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAixOv5bT0pCkyaU3Zjs6LAmL8Z4eg4fgw',
  authDomain: 'crwn-db-26663.firebaseapp.com',
  projectId: 'crwn-db-26663',
  storageBucket: 'crwn-db-26663.appspot.com',
  messagingSenderId: '452152543555',
  appId: '1:452152543555:web:46d23f773c1da12315c7f6',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
