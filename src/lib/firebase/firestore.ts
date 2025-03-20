import { getFirestore } from "@firebase/firestore";
import { app as firebaseApp } from "./firebase-config";

const db = getFirestore(firebaseApp);
export default db;
