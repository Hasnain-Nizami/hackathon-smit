 
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
 import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut ,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
 import { getFirestore,doc,getDoc,addDoc,orderBy,collection,serverTimestamp,query,getDocs,updateDoc, setDoc, deleteDoc} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
 import { getStorage, ref, uploadBytesResumable,getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
 

 const firebaseConfig = {
   apiKey: "AIzaSyAKJ-3ZotUGrqQpNMC1as6vByfpczCeTpg",
   authDomain: "mini-hackthon-5bd79.firebaseapp.com",
   projectId: "mini-hackthon-5bd79",
   storageBucket: "mini-hackthon-5bd79.appspot.com",
   messagingSenderId: "1090944357996",
   appId: "1:1090944357996:web:9af42f1a38182e3ccd6a49"
 };


 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);
 const auth = getAuth(app);
 const storage = getStorage();

 export{auth,createUserWithEmailAndPassword,doc,getDoc ,orderBy,getDocs,serverTimestamp,query ,db,signInWithEmailAndPassword,signOut,updateDoc ,onAuthStateChanged,addDoc,collection,deleteDoc,setDoc,getDownloadURL,storage, ref, uploadBytesResumable}