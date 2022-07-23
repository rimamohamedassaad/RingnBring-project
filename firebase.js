// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // https://firebase.google.com/docs/web/setup#available-libraries
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore"
// import { getStorage } from "firebase/storage"
// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBNZeZD9fzHDqrTcUi4PWL7I4s9Q7FKSco",
//   authDomain: "ringnbring-fb1de.firebaseapp.com",
//   projectId: "ringnbring-fb1de",
//   storageBucket: "ringnbring-fb1de.appspot.com",
//   messagingSenderId: "906585688550",
//   appId: "1:906585688550:web:1542e6de82acf2b4e2ae27"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const authentication = getAuth(app);
// export const db = getFirestore(app)
// export const storage = getStorage(app)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBNZeZD9fzHDqrTcUi4PWL7I4s9Q7FKSco",
  authDomain: "ringnbring-fb1de.firebaseapp.com",
  projectId: "ringnbring-fb1de",
  storageBucket: "ringnbring-fb1de.appspot.com",
  messagingSenderId: "906585688550",
  appId: "1:906585688550:web:1542e6de82acf2b4e2ae27"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)


