import { useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export type StaffRole = "editor" | "admin" | null;

export function useFirebaseStaffAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<StaffRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => onAuthStateChanged(auth, async (nextUser) => {
    setUser(nextUser);
    if (nextUser) {
      const token = await nextUser.getIdTokenResult(true);
      const claim = token.claims.role;
      setRole(claim === "admin" || claim === "editor" ? claim : null);
    } else {
      setRole(null);
    }
    setLoading(false);
  }), []);

  const signInEmail = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);
  const signInGoogle = () => signInWithPopup(auth, new GoogleAuthProvider());
  const logout = () => signOut(auth);

  return { user, role, loading, isStaff: Boolean(user && role), signInEmail, signInGoogle, logout };
}
