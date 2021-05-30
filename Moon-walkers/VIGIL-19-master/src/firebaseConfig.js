import firebase from "firebase";
const config = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DBURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MID,
};
const firebaseConfig = firebase.initializeApp(config);
export default firebaseConfig;
