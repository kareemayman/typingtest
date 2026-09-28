import Styles from "./Header.module.css"
import LogoLarge from "/assets/images/logo-large.svg"
import LogoSmall from "/assets/images/logo-small.svg"
import TrophyIcon from "/assets/images/icon-personal-best.svg"
import { useTyping } from "../../state/typingContext"

export default function Header() {
  const { wpm: personalBest } = useTyping()

  return (
    <div className="container">
      <div className={Styles.header}>
        <img src={LogoLarge} alt="logo" className={Styles.desktop} />
        <img src={LogoSmall} alt="logo" className={Styles.mobile} />
        <div className={Styles.personalBest}>
          <img src={TrophyIcon} alt="Trophy Icon" />
          <p>
            <span className={Styles.desktop}>Personal</span> best:{" "}
            <span className={Styles.wpm}>{personalBest} WPM</span>
          </p>
        </div>
      </div>
    </div>
  )
}
