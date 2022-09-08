import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtXY2fHven1VjLdd9OdzicIfRtlbuKDHQ",
  authDomain: "vue-3-2022-c8f7c.firebaseapp.com",
  projectId: "vue-3-2022-c8f7c",
  storageBucket: "vue-3-2022-c8f7c.appspot.com",
  messagingSenderId: "358722206767",
  appId: "1:358722206767:web:04c9c59f47f37a67cd1ada"
};

initializeApp(firebaseConfig);
const auth = getAuth();

export { auth }