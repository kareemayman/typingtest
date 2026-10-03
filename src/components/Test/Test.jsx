import { useTyping } from "../../state/typingContext"
import Styles from "./Test.module.css"
import passages from "../../../data.json"
import { useEffect, useRef, useState } from "react"
import StatusBar from "../StatusBar/StatusBar"
import TestCompleted from "../TestCompleted/TestCompleted"
import IconRestart from "../../../assets/images/icon-restart.svg"

function getRandomPassage(difficulty) {
  const difficultyPassages = passages[difficulty.toLowerCase()] || passages.easy

  const randomIndex = Math.floor(Math.random() * difficultyPassages.length)
  return difficultyPassages[randomIndex].text
}

function splitIntoWords(passage) {
  const words = []
  let offset = 0
  for (const word of passage.match(/\S+\s*/g) || []) {
    words.push({ word, offset })
    offset += word.length
  }
  return words
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
  const words = splitIntoWords(passage)

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
    <div
      className={`container ${Styles.testContainer}`}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      ref={passageRef}
    >
      <StatusBar accuracy={accuracy} time={time} />
      <div
        className={Styles.test}
        style={{ borderBottom: !testStarted ? "none" : "1px solid var(--neutral-800)" }}
      >
        <div className={`${Styles.passage} ${!testStarted ? Styles.blurry : ""}`}>
          {words.map(({ word, offset }, i) => (
            <div className={Styles.word} key={`word-${i}`}>
              {[...word].map((c, j) => {
                const index = offset + j
                const letterClass =
                  index === caret ? "caret" : typed[index] === c ? "correct" : "mistake"
                return (
                  <div className={index > caret ? Styles.normal : Styles[letterClass]} key={j}>
                    {c === " " ? "\u00A0" : c}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {!testStarted && (
          <div className={Styles.startTestContainer} onClick={() => setTestStarted(true)}>
            <button>Start Typing Test</button>
            <p>Or click the text and start typing</p>
          </div>
        )}
      </div>

      {testStarted && (
        <button className={Styles.restartButton} onClick={restartTest}>
          Restart Test
          <img src={IconRestart} alt="restart icon" className={Styles.restartIcon} />
        </button>
      )}
    </div>
  )
}
