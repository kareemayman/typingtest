import { useTyping } from "../../state/typingContext"
import Styles from "./Test.module.css"
import passages from "../../../data.json"
import { useEffect, useRef, useState } from "react"

function getRandomPassage(difficulty) {
  const difficultyPassages = passages[difficulty.toLowerCase()] || passages.easy

  const randomIndex = Math.floor(Math.random() * difficultyPassages.length)
  return difficultyPassages[randomIndex].text
}

export default function Test() {
  const { difficulty } = useTyping()
  const [testStarted, setTestStarted] = useState(false)
  const [passage, setPassage] = useState(() => getRandomPassage(difficulty))
  const [caret, setCaret] = useState(0)
  const [prevDifficulty, setPrevDifficulty] = useState(difficulty)
  const passageRef = useRef(null)
  const [correct, setCorrect] = useState(new Set())

  if (difficulty !== prevDifficulty) {
    setPrevDifficulty(difficulty)
    setPassage(getRandomPassage(difficulty))
    setCaret(0) // reset progress since the passage changed underneath the user
    setCorrect(new Set())
  }

  useEffect(() => {
    if (testStarted) passageRef.current.focus()
  }, [testStarted])

  const moveCaret = (e) => {
    e.stopPropagation()
    if (e.key.length !== 1) return

    if (e.key === passage[caret]) {
      setCorrect(prev => new Set(prev).add(caret))
    }
    setCaret(val => val+1)
  }

  return (
    <div
      className={Styles.container}
      style={{ borderBottom: !testStarted ? "none" : "1px solid var(--neutral-800)" }}
    >
      <div className={`${Styles.passage} ${!testStarted ? Styles.blurry : ""}`} onKeyDown={moveCaret} tabIndex={-1} ref={passageRef}>
        {[...passage].map((c, i) => {
          const letterClass = i === caret ? "caret" : correct.has(i) ? "correct" : "mistake"
          return <div className={i > caret ? Styles.normal : Styles[letterClass]} key={i}>{c === " " ? "\u00A0" : c}</div>
        })}
      </div>

      {!testStarted && (
        <div className={Styles.startTestContainer}  onClick={() => setTestStarted(true)}>
          <button>Start Typing Test</button>
          <p>Or click the text and start typing</p>
        </div>
      )}
    </div>
  )
}
