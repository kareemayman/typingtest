import Styles from "./ControlDropdown.module.css"
import ArrowDown from "../../assets/images/icon-down-arrow.svg"

export default function ControlDropdown({ options = [], variable }) {
  return (
    <div className={Styles.controlDropdown}>
      <p>
        {options[0]}
        <img src={ArrowDown} alt="Arrow Down" />
      </p>
      <div className={Styles.options}>
        {options.map((o, i) => {
          return (
            <label className={Styles.option} key={i}>
              <input type="radio" name={variable} id={o} className={Styles.optionInput} />
              <p>{o}</p>
            </label>
          )
        })}
      </div>
    </div>
  )
}
