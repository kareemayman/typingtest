import { useState } from "react"
import ControlButton from "../ControlButton"
import ControlDropdown from "../ControlDropdown"
import Styles from "./StatusBar.module.css"

export default function StatusBar() {
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [time, setTime] = useState(60)
  const [difficulty, setDifficulty] = useState(() => {
    const diff = localStorage.getItem("typingTestDifficulty")
    return diff ? diff : "Easy"
  })
  const [mode, setMode] = useState(() => {
    const m = localStorage.getItem("typingTestMode")
    return m ? m : "Timed (60s)"
  })

  const changeDifficulty = (diff) => {
    setDifficulty(diff)
    localStorage.setItem("typingTestDifficulty", diff)
  }

  const changeMode = (m) => {
    setMode(m)
    localStorage.setItem("typingTestMode", m)
  }

  return (
    <div className={Styles.statusBar}>
      <div className={Styles.stats}>
        <p className={Styles.wpm}>
          WPM:<span>{wpm}</span>
        </p>

        <div className={Styles.divider}></div>

        <p className={Styles.accuracy}>
          Accuracy:<span>{accuracy}%</span>
        </p>

        <div className={Styles.divider}></div>

        <p className={Styles.time}>
          Time:<span>0:{time}</span>
        </p>
      </div>

      <div className={Styles.controls}>
        <div className={`${Styles.difficulty} ${Styles.desktop}`}>
          <p>Difficulty: </p>
          <div className={Styles.controlGroup}>
            <ControlButton
              text={"Easy"}
              active={difficulty === "Easy"}
              onButtonClick={changeDifficulty}
            />
            <ControlButton
              text={"Medium"}
              active={difficulty === "Medium"}
              onButtonClick={changeDifficulty}
            />
            <ControlButton
              text={"Hard"}
              active={difficulty === "Hard"}
              onButtonClick={changeDifficulty}
            />
          </div>
        </div>

        <div className={Styles.mobile}>
          <ControlDropdown
            options={["Easy", "Medium", "Hard"]}
            variable={"difficulty"}
            defaultValue={difficulty}
            onOptionClick={changeDifficulty}
          />
        </div>

        <div className={`${Styles.divider} ${Styles.desktop}`}></div>

        <div className={`${Styles.mode} ${Styles.desktop}`}>
          <p>Mode: </p>
          <div className={Styles.controlGroup}>
            <ControlButton
              text={"Timed (60s)"}
              active={mode === "Timed (60s)"}
              onButtonClick={changeMode}
            />
            <ControlButton
              text={"Passage"}
              active={mode === "Passage"}
              onButtonClick={changeMode}
            />
          </div>
        </div>

        <div className={Styles.mobile}>
          <ControlDropdown
            options={["Timed (60s)", "Passage"]}
            variable={"mode"}
            defaultValue={mode}
            onOptionClick={changeMode}
          />
        </div>
      </div>
    </div>
  )
}
