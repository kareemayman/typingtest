import { useTyping } from "../../state/typingContext"
import Styles from "./Test.module.css"
import passages from "../../../data.json"
import { useEffect, useRef, useState } from "react"
import StatusBar from "../StatusBar/StatusBar"
import TestCompleted from "../TestCompleted/TestCompleted"

function getRandomPassage(difficulty) {
  const difficultyPassages = passages[difficulty.toLowerCase()] || passages.easy

  const randomIndex = Math.floor(Math.random() * difficultyPassages.length)
  return difficultyPassages[randomIndex].text
}

export default function Test() {
  const { difficulty, mode } = useTyping()
  const [run, setRun] = useState(0)

  return (
    <TypingTest
      difficulty={difficulty}
      mode={mode}
      restartTest={() => setRun((prev) => prev + 1)}
      key={`${difficulty}-${mode}-${run}`}
    />
  )
}

function TypingTest({ difficulty, mode, restartTest }) {
  const [passage] = useState(() => getRandomPassage(difficulty))
  const [typed, setTyped] = useState("")
  const [testStarted, setTestStarted] = useState(false)
  const [time, setTime] = useState(mode === "Timed" ? 60 : 0)
  const passageRef = useRef(null)

  const caret = typed.length
  const correctCount = [...typed].filter((ch, i) => ch === passage[i]).length
  const accuracy = caret === 0 ? 100 : Math.round((correctCount / caret) * 100)
  const finished = caret >= passage.length || (mode === "Timed" && time <= 0)

  useEffect(() => {
    if (testStarted) passageRef.current?.focus()
  }, [testStarted])

  useEffect(() => {
    if (!testStarted || finished) return
    const id = setInterval(() => {
      setTime((t) => (mode === "Timed" ? t - 1 : t + 1))
    }, 1000)
    return () => clearInterval(id)
  }, [testStarted, finished, mode])

  const handleKeyDown = (e) => {
    e.stopPropagation()
    if (e.key.length !== 1 || finished) return
    setTyped((prev) => prev + e.key)
  }

  if (finished) return <TestCompleted mode={"normal"} restartTest={restartTest} />

  return (
    <div className={`container ${Styles.testContainer}`} onKeyDown={handleKeyDown} tabIndex={-1} ref={passageRef}>
      <StatusBar accuracy={accuracy} time={time} />
      <div
        className={Styles.test}
        style={{ borderBottom: !testStarted ? "none" : "1px solid var(--neutral-800)" }}
      >
        <div className={`${Styles.passage} ${!testStarted ? Styles.blurry : ""}`}>
          {[...passage].map((c, i) => {
            const letterClass = i === caret ? "caret" : typed[i] === c ? "correct" : "mistake"
            return (
              <div className={i > caret ? Styles.normal : Styles[letterClass]} key={i}>
                {c === " " ? "\u00A0" : c}
              </div>
            )
          })}
        </div>

        {!testStarted && (
          <div className={Styles.startTestContainer} onClick={() => setTestStarted(true)}>
            <button>Start Typing Test</button>
            <p>Or click the text and start typing</p>
          </div>
        )}
      </div>
    </div>
  )
}
