import { collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const CardRef = collection(db, "Card");
