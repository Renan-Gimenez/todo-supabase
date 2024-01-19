"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: string;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    setUser("renan");
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
