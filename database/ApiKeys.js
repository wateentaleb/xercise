import Firebase from "firebase";

let configFirebase = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  fbappId: "",
};

let app = Firebase.initializeApp(configFirebase);
export const ApiKeys = app.database();
