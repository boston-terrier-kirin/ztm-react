import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  collection,
  // 初回データ投入用
  // writeBatch,
  getFirestore,
  doc,
  getDoc,
  setDoc,
  query,
  getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAixOv5bT0pCkyaU3Zjs6LAmL8Z4eg4fgw',
  authDomain: 'crwn-db-26663.firebaseapp.com',
  projectId: 'crwn-db-26663',
  storageBucket: 'crwn-db-26663.appspot.com',
  messagingSenderId: '452152543555',
  appId: '1:452152543555:web:46d23f773c1da12315c7f6',
};

// const firebaseApp = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

// 初回データ投入用
// export const addCollectionAndDocuments = async (
//   collectionKey,
//   objectsToAdd
// ) => {
//   const collectionRef = collection(db, collectionKey);
//   const batch = writeBatch(db);

//   objectsToAdd.forEach((object) => {
//     const docRef = doc(collectionRef, object.title.toLowerCase());
//     batch.set(docRef, object);
//   });

//   await batch.commit();
//   console.log('done');
// };

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  // ここでreduceするのではなく、selectCatetoriesMapでやる。
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());

  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
  //   const { title, items } = docSnapshot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});
  // return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) {
    return;
  }

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  }

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  return signOut(auth);
};

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
