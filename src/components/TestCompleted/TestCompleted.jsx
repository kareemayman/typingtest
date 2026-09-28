import Styles from "./TestCompleted.module.css"
import TestCompletedCheck from "../../../assets/images/icon-completed.svg"
import Star1 from "../../../assets/images/pattern-star-1.svg"
import Star2 from "../../../assets/images/pattern-star-2.svg"
import IconRestart from "../../../assets/images/icon-restart.svg"
import HighScoreIcon from "../../../assets/images/icon-new-pb.svg"
import Confetti from "../../../assets/images/pattern-confetti.svg"

export default function TestCompleted({ mode, restartTest }) {
  return (
    <>
      <div className="container">
        <div className={Styles.testCompleted}>
          {mode !== "high score" && (
            <>
              <div className={Styles.star1}>
                <img src={Star1} alt="star1" />
              </div>
              <div className={Styles.star2}>
                <img src={Star2} alt="star2" />
              </div>
            </>
          )}
          {mode !== "high score" ? (
            <div className={Styles.testCompletedCheck}>
              <img src={TestCompletedCheck} />
            </div>
          ) : (
            <div className={Styles.highScoreIcon}>
              <img src={HighScoreIcon} alt="high score icon" />
            </div>
          )}
          <h1>
            {mode === "normal"
              ? "Test Complete!"
              : mode === "baseline"
                ? "Baseline Established!"
                : "High Score Smashed!"}
          </h1>
          <p className={Styles.description}>
            {mode === "normal"
              ? "Solid run. Keep pushing to beat your high score."
              : mode === "baseline"
                ? "You've set the bar. Now the real challenge begins-time to beat it."
                : "You're getting faster. That was incredible typing."}
          </p>
          <div className={Styles.stats}>
            <div>
              <p className={Styles.statTitle}>WPM:</p>
              <p className={`${Styles.value} ${Styles.wpm}`}>85</p>
            </div>
            <div>
              <p className={Styles.statTitle}>Accuracy:</p>
              <p className={`${Styles.value} ${Styles.acc}`}>90%</p>
            </div>
            <div>
              <p className={Styles.statTitle}>Characters:</p>
              <p className={`${Styles.value} ${Styles.chars}`}>
                <span className={Styles.correct}>120</span>/
                <span className={Styles.incorrect}>5</span>
              </p>
            </div>
          </div>
          <button className={Styles.restartButton} onClick={restartTest}>
            {mode === "normal" ? "Go Again" : "Beat This Score"}
            <div className={Styles.restartIcon}>
              <img src={IconRestart} alt="restart" />
            </div>
          </button>
        </div>
      </div>
      {mode === "high score" && (
        <div className={Styles.confetti}>
          <img src={Confetti} alt="confetti" />
        </div>
      )}
    </>
  )
}
