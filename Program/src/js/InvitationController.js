import { db} from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useState } from 'react';

export const invitationRef = collection(db, "InviteLink"); 