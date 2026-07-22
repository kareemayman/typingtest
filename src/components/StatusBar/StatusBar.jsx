import ControlButton from "../ControlButton"
import Styles from "./StatusBar.module.css"

export default function StatusBar() {
  return (
    <div className={Styles.statusBar}>
      <div className={Styles.stats}>
        <p className={Styles.wpm}>
          WPM:<span>0</span>
        </p>

        <div className={Styles.divider}></div>

        <p className={Styles.accuracy}>
          Accuracy:<span>100%</span>
        </p>

        <div className={Styles.divider}></div>

        <p className={Styles.time}>
          Time:<span>0:60</span>
        </p>
      </div>

      <div className={Styles.controls}>
        <div className={Styles.difficulty}>
          <p>Difficulty: </p>
          <div className={Styles.controlGroup}>
            <ControlButton text={"Easy"}/>
            <ControlButton text={"Medium"}/>
            <ControlButton text={"Hard"}/>
          </div>
        </div>

        <div className={Styles.divider}></div>

        <div className={Styles.mode}>
          <p>Mode: </p>
          <div className={Styles.controlGroup}>
            <ControlButton text={"Timed (60s)"}/>
            <ControlButton text={"Passage"}/>
          </div>
        </div>
      </div>
    </div>
  )
}
