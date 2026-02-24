import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";
export async function saveItem(userId, item) {
  if (!userId) throw new Error("User not authenticated");

  const docRef = await addDoc(collection(db, "users", userId, "items"), {
    ...item,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}
