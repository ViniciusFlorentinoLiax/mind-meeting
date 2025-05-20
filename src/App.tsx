import { type ReactNode } from "react";
import "./App.css";
import { AuthContext } from "./context/AuthContext";

export interface User{
  name: string,
  age: number,
  email: string,
}

export function App({children}: {children?: ReactNode }) {
  const currentUser: User = { name: 'Teste', age: 21, email: "teste@gmail.com" };

  return (
    <AuthContext.Provider value={currentUser}>
      {children}
    </AuthContext.Provider>
  );
}
