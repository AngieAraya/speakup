import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  //OBS kolla upp detta,INFO SKA EJ STÅ HÄR, ska stå i env fil
  apiKey: `AIzaSyDKirqO0Es1M1X4cupVpy_CYXGCFos_H-8`,
  authDomain: `auth-development-eaa23.firebaseapp.com`,
  projectId: `auth-development-eaa23`,
  storageBucket: `auth-development-eaa23.appspot.com`,
  messagingSenderId: `1083378600120`,
  appId: `1:1083378600120:web:718635a37c4f96bfa8cc4d`
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID
})

// var provider = new firebase.auth.FacebookAuthProvider();
// console.log(provider);


export const auth = app.auth()
export default app