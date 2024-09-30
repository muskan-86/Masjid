import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth  } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW79mjwRTsS258P_tG4C6kKzZdylfYUps",
  authDomain: "bilalmasjid-49299.firebaseapp.com",
  projectId: "bilalmasjid-49299",
  storageBucket: "bilalmasjid-49299.appspot.com",
  messagingSenderId: "663574202197",
  appId: "1:663574202197:web:ba590d467e29fa600ad1dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Firestore with cache disabled
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({sizeBytes: 0})
});
const storage = getStorage(app);


export { app, auth, db,storage };