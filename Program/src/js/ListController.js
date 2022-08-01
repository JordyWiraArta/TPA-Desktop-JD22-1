import { arrayUnion, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const ListRef = collection(db, 'List');

export async function deleteList(listId){
    await deleteDoc( doc(db, 'List', listId));
}

export function updateCardList(listId, cardId){
    try {
        updateDoc(doc(db, "list", listId), {
            AllListCard: arrayUnion(cardId)
        })
    } catch (error) {
        console.log(error)
    }
}