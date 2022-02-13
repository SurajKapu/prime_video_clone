import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDRlevG0ymgag7YZU_xPXh1udBe9h91fVE",
  authDomain: "prime-video-clone-2b9af.firebaseapp.com",
  projectId: "prime-video-clone-2b9af",
  storageBucket: "prime-video-clone-2b9af.appspot.com",
  messagingSenderId: "237580199525",
  appId: "1:237580199525:web:c73ce92c3bb0758955488c",
  measurementId: "G-VDN776BPNT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { auth, storage };
export default db;
