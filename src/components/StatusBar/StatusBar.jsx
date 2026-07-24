import ControlButton from "../ControlButton"
import ControlDropdown from "../ControlDropdown"
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
        <div className={`${Styles.difficulty} ${Styles.desktop}`}>
          <p>Difficulty: </p>
          <div className={Styles.controlGroup}>
            <ControlButton text={"Easy"}/>
            <ControlButton text={"Medium"}/>
            <ControlButton text={"Hard"}/>
          </div>
        </div>

        <div className={Styles.mobile}>
          <ControlDropdown options={["Easy", "Medium", "Hard"]} variable={"difficulty"} />
        </div>

        <div className={`${Styles.divider} ${Styles.desktop}`}></div>

        <div className={`${Styles.mode} ${Styles.desktop}`}>
          <p>Mode: </p>
          <div className={Styles.controlGroup}>
            <ControlButton text={"Timed (60s)"}/>
            <ControlButton text={"Passage"}/>
          </div>
        </div>

        <div className={Styles.mobile} className={Styles.mobile}>
          <ControlDropdown options={["Timed (60s)", "Passage"]} variable={"mode"} />
        </div>
      </div>
    </div>
  )
}
