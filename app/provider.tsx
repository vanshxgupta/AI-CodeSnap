"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth } from "@/configs/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

// ✅ Define context type
interface AuthContextType {
  user: User | null;
}

// ✅ Create context with undefined initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Auth provider component
const Provider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook to consume context safely
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a Provider");
  }
  return context;
};

export { AuthContext };
export default Provider;
