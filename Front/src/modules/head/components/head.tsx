import { LogoPomo, MarketIcon } from "../../../utils/Icons/icons";
import style from "../styles/Head.module.css";

export default function Head() {
  return (
    <div className={style.principalContainer}>
      <div className={style.logoContainer}>
        <LogoPomo className={style.logo} />
        <h1>Pomo Pos</h1>
      </div>
      <div className={style.identifyContainer}>
        <h3 className={style.identifyContainer__h3}>User</h3>
        <MarketIcon className={style.icon} />
        <h2>La esquina del sabor</h2>
      </div>
    </div>
  );
}
