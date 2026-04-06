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
  getDocs,
  where,
} from "firebase/firestore";

import { db, auth } from "./firebase";
import { updatePassword } from "firebase/auth";

export async function saveItem(userId, item) {
  if (!userId) throw new Error("User not authenticated");

  const docRef = await addDoc(collection(db, "users", userId, "items"), {
    ...item,

    year: item?.year ?? null,

    isWatched: item.isWatched ?? false,
    type: item.type || "movie",

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

export function subscribeToUserItems(userId, callback, filters = {}) {
  if (!userId) return;

  const { isWatched = null, type = null } = filters;

  let constraints = [orderBy("createdAt", "desc")];

  if (isWatched !== null) {
    constraints.push(where("isWatched", "==", isWatched));
  }

  if (type) {
    constraints.push(where("type", "==", type));
  }

  const q = query(collection(db, "users", userId, "items"), ...constraints);

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(items);
  });

  return unsubscribe;
}

/* =========================
   UPDATE ITEM
========================= */
export async function updateItem(userId, itemId, updates) {
  if (!userId || !itemId) {
    throw new Error("Missing ids");
  }

  const ref = doc(db, "users", userId, "items", itemId);

  await updateDoc(ref, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

/* =========================
   TOGGLE WATCHED
========================= */
export async function toggleWatched(userId, docId, currentValue) {
  if (!userId || !docId || typeof docId !== "string") {
    throw new Error("Invalid userId or docId");
  }

  const ref = doc(db, "users", userId, "items", docId);

  await updateDoc(ref, {
    isWatched: !currentValue,
    updatedAt: serverTimestamp(),
  });
}
/* =========================
   UPDATE TYPE (helper)
========================= */
export async function updateItemType(userId, itemId, type) {
  if (!userId || !itemId) {
    throw new Error("Missing ids");
  }

  const ref = doc(db, "users", userId, "items", itemId);

  await updateDoc(ref, {
    type,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteItem(userId, docId) {
  if (!userId || !docId) {
    throw new Error("Missing userId or docId");
  }

  const ref = doc(db, "users", userId, "items", docId);
  await deleteDoc(ref);
}

export async function fetchUserItems(userId, filters = {}) {
  if (!userId) throw new Error("User not authenticated");

  const { isWatched = null, type = null } = filters;

  let constraints = [orderBy("createdAt", "desc")];

  if (isWatched !== null) {
    constraints.push(where("isWatched", "==", isWatched));
  }

  if (type) {
    constraints.push(where("type", "==", type));
  }

  const q = query(collection(db, "users", userId, "items"), ...constraints);

  const snapshot = await getDocs(q);

  const items = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return items;
}

export async function checkItemSaved(userId, itemId) {
  if (!userId || !itemId) return false;

  const q = query(
    collection(db, "users", userId, "items"),
    where("itemId", "==", itemId),
  );

  const snapshot = await getDocs(q);

  return !snapshot.empty;
}

export function listenUserItems(userId, callback) {
  if (!userId) return () => {};

  const colRef = collection(db, "users", userId, "items");

  const unsubscribe = onSnapshot(colRef, (snapshot) => {
    const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(items);
  });

  return unsubscribe;
}

export async function updateUserName(userId, { firstName, lastName }) {
  if (!userId) throw new Error("User not authenticated");

  const ref = doc(db, "users", userId);

  await updateDoc(ref, {
    firstName,
    lastName,
    updatedAt: serverTimestamp(),
  });
}

export async function updateUserPassword(newPassword) {
  const user = auth.currentUser;

  if (!user) throw new Error("User not authenticated");

  await updatePassword(user, newPassword);
}
