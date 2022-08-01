import { db } from '../firebaseConfig';
import { collection, addDoc, updateDoc, doc, arrayRemove, arrayUnion, deleteDoc} from 'firebase/firestore';
import { createContext,  useContext, useEffect, useState } from 'react';
import { updateOwnedBoard } from "./UserController.js";
import { updateBoardWorkspace } from './WorkspaceController.js';

export const BoardRef = collection(db, 'Board');

export const InputBoard = (newName, Desc, userId, workspaceId) => {
   
  let arrUser = [];
  arrUser.push(userId);

  try{
     addDoc(BoardRef, {
        Name: newName,
        Description: Desc,
        Visibility: "public",
        StatusClosed: false,
        AllBoardAdminId: arrUser,
        WorkspaceId: workspaceId,
        AllBoardMemberId: [],
        AllBoardListId: []

     }).then((doc) => {
        updateOwnedBoard(userId, doc.id);
        updateBoardWorkspace(workspaceId, doc.id);
     })
     
  }catch (error){
     console.log(error)
  }
}

export function RevokeBoardUser(userId, BoardId){
  try {

     updateDoc( doc(db, "Board", BoardId), {
        AllBoardAdminId: arrayRemove(userId),
        AllBoardMemberId: arrayUnion(userId)
     })

 } catch (error) {
     console.log(error)
 }
}

export function GrantBoardUser(userId, BoardId){
   try {

     updateDoc( doc(db, "Board", BoardId), {
        AllBoardAdminId: arrayUnion(userId),
        AllBoardMemberId: arrayRemove(userId)
     })

   } catch (error) {
      console.log(error)
   }
}

export function SetVisibility(visibility, BoardId){
  console.log(BoardId + " " + visibility)
  try {

     updateDoc( doc(db, "Board", BoardId), {
        Visibility: visibility
     })

 } catch (error) {
     console.log(error)
 }
}

export function addBoardMember(userId, BoardId){
  try {

     updateDoc( doc(db, "Board", BoardId), {
        AllBoardMemberId: arrayUnion(userId)
     })

 } catch (error) {
     console.log(error)
 }
}

export function removeBoardUser(userId, BoardId){
  try {

     updateDoc( doc(db, "Board", BoardId), {
        AllBoardAdminId: arrayRemove(userId),
        AllBoardMemberId: arrayRemove(userId)
     })

 } catch (error) {
     console.log(error)
 }
}

export function closeBoard(BoardId){
   try {

      updateDoc( doc(db, "Board", BoardId), {
         StatusClosed: true,
         WorkspaceId: ""
      })
 
  } catch (error) {
      console.log(error)
  }
}

export function reopenBoard(BoardId, workspaceId){
   try {
      updateDoc( doc(db, "Board", BoardId), {
         StatusClosed: false,
         WorkspaceId: workspaceId
      })
      updateBoardWorkspace(workspaceId, BoardId);
  } catch (error) {
      console.log(error)
  }
}

export async function deleteBoard(BoardId){
  await deleteDoc( doc(db, "Board", BoardId)) 
}

export function updateListBoard(boardId, listId){
   try {

      updateDoc( doc(db, "Board", boardId), {
         AllBoardListId: arrayUnion(
            listId
         )
      })

  } catch (error) {
      console.log(error)
  }
 }

 export function deleteListBoard(boardId, listId){
   try {

      updateDoc( doc(db, "Board", boardId), {
         AllBoardListId: arrayRemove(
            listId
         )
      })

  } catch (error) {
      console.log(error)
  }
 }