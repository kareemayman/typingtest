import { useTyping } from "../../state/typingContext"
import Styles from "./Test.module.css"
import passages from "../../../data.json"
import { useState } from "react"

function getRandomPassage(difficulty) {
  const difficultyPassages = passages[difficulty.toLowerCase()] || passages.easy

  const randomIndex = Math.floor(Math.random() * difficultyPassages.length)
  return difficultyPassages[randomIndex].text
}

export default function Test() {
  const { difficulty } = useTyping()
  const [testStarted, setTestStarted] = useState(false)
  const [caret, setCaret] = useState(0)
  const passage = getRandomPassage(difficulty)

  return (
    <div
      className={Styles.container}
      style={{ borderBottom: !testStarted ? "none" : "1px solid var(--neutral-800)" }}
    >
      <div className={`${Styles.passage} ${!testStarted ? Styles.blurry : ""}`}>
        <div className={Styles.caret}>{passage[caret]}</div>
        {passage.slice(caret+1)}
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
