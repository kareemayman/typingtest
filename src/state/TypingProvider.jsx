import { useState } from "react"
import { TypingContext } from "./typingContext"

export default function TypingProvider({ children }) {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("typingTestMode")
    return savedMode ? savedMode : "Timed"
  })
  const [difficulty, setDifficulty] = useState(() => {
    const savedDifficulty = localStorage.getItem("typingTestDifficulty")
    return savedDifficulty ? savedDifficulty : "Easy"
  })
  const [wpm, setWpm] = useState(() => {
    const savedWpm = localStorage.getItem(`typingTestWpm_${mode}_${difficulty}`)
    return savedWpm ? JSON.parse(savedWpm) : 0
  })

  return (
    <TypingContext.Provider value={{ mode, setMode, difficulty, setDifficulty, wpm, setWpm }}>
      {children}
    </TypingContext.Provider>
  )
}
