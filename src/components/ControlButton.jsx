import Styles from "./ControlButton.module.css"

export default function ControlButton({ text = "", active, onButtonClick }) {
  return (
    <button className={`${Styles.controlButton} ${active ? Styles.active : ""}`} onClick={() => {onButtonClick(text)}}>
      {text}
    </button>
  )
}
