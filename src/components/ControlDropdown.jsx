import Styles from "./ControlDropdown.module.css"
import ArrowDown from "../../assets/images/icon-down-arrow.svg"
import { useEffect, useRef, useState } from "react"

export default function ControlDropdown({ options = [], variable, defaultValue, onOptionClick }) {
  const dropDownRef = useRef()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) setIsOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className={Styles.controlDropdown} ref={dropDownRef}>
      <p onClick={() => setIsOpen((prev) => !prev)}>
        {defaultValue}
        <img src={ArrowDown} alt="Arrow Down" />
      </p>
      <div className={`${Styles.options} ${isOpen ? Styles.open : ""}`}>
        {options.map((o, i) => {
          return (
            <label
              className={Styles.option}
              key={i}
              onClick={() => {
                onOptionClick(o)
                setIsOpen(false)
              }}
            >
              <input type="radio" name={variable} id={o} className={Styles.optionInput} checked={defaultValue === o} />
              <p>{o}</p>
            </label>
          )
        })}
      </div>
    </div>
  )
}
