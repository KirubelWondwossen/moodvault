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

export function subscribeToUserItems(userId, callback) {
  if (!userId) return;

  const q = query(
    collection(db, "users", userId, "items"),
    orderBy("createdAt", "desc"),
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(items);
  });

  return unsubscribe;
}
