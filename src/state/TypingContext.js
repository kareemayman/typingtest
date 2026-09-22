import { createContext, useContext } from "react";

export const TypingContext = createContext(null)

export function useTyping() {
  const ctx = useContext(TypingContext)
  if(!ctx) throw new Error("useTyping must be used within a TypingProvider")
  return ctx
}
