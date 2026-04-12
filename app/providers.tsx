"use client";

import { createContext, useContext } from "react";

const AuthContext = createContext<any>(null);

export function AuthProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
