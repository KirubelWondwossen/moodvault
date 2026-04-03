import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleOffline = () => {
      setError("offline");
    };

    const handleOnline = () => {
      setError(null);
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        setError(null);

        if (firebaseUser) {
          const docRef = doc(db, "users", firebaseUser.uid);

          let docSnap = null;

          try {
            docSnap = await getDoc(docRef);
          } catch (err) {
            console.error("Firestore error:", err.message);
            if (!navigator.onLine) {
              setError("offline");
              setUser(firebaseUser);
              setLoading(false);
              return;
            } else {
              throw err;
            }
          }

          if (docSnap && docSnap.exists()) {
            setUser({
              ...firebaseUser,
              ...docSnap.data(),
            });
          } else {
            setUser(firebaseUser);
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Auth error:", err.message);

        if (!navigator.onLine) {
          setError("offline");
        } else {
          setError(err.message);
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, []);

  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err.message);
      setError(err.message);
    }
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}
