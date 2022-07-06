import firebase from "firebase";

const firebaseConfig = {
  // ********** production **********
  apiKey: "AIzaSyC0v_0kmabYJJcNrkJo7_fHXPnTWZejNyc",
  authDomain: "timegram-production.firebaseapp.com",
  projectId: "timegram-production",
  storageBucket: "timegram-production.appspot.com",
  messagingSenderId: "1010963706170",
  appId: "1:1010963706170:web:41a84a4347c043c66ca003",
  // ********************************
  // ********** staging **********
  // apiKey: 'AIzaSyBLu2iTWYpJXXK-897L3u77tB6D4UCRMcM',
  // authDomain: 'timegram-8ecdc.firebaseapp.com',
  // projectId: 'timegram-8ecdc',
  // storageBucket: 'timegram-8ecdc.appspot.com',
  // messagingSenderId: '427609028375',
  // appId: '1:427609028375:web:82b51076e1a711d72a6952',
  // *****************************
};

try {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().enablePersistence();
} catch (error) {
  // already exists
}

export const auth = firebase.auth;
export const currentUser = () => firebase.auth().currentUser;

export const db = firebase.firestore;
// ******************** refs ********************
export const refs = {
  users: db().collection("users"),
  assets: db().collection("assets"),
  errors: db().collection("errors"),
  processMappings: db()
    .collection("global-config")
    .doc("processMappings")
    .collection("windows")
    .doc("mappings"),
  currentDayHighlights: (userId, date) =>
    db().collection("users").doc(userId).collection("days").doc(date),
};
// **********************************************
