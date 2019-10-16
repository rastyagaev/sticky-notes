import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";

const settings = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  projectId: process.env.REACT_APP_PROJECT_ID
};
const app = firebase.initializeApp(settings);
const database = firebase.firestore(app);

export default database;
