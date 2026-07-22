import Styles from "./ControlButton.module.css"

export default function ControlButton({ text = "" }) {
  return (
    <button className={Styles.controlButton}>
      {text}
    </button>
  )
}
