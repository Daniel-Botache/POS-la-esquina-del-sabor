import { LogoPomo, MarketIcon } from "../../../utils/Icons/icons";
import style from "../styles/Head.module.css";
import { useCustomSelector } from "../../../store/hooks";

export default function Head() {
  const username = useCustomSelector((state) => state.auth.user);
  return (
    <div className={style.principalContainer}>
      <div className={style.logoContainer}>
        <LogoPomo className={style.logo} />
        <h1 className={style.identifyContainer__h1}>Pomo Pos</h1>
      </div>
      <div className={style.companyContainer}>
        <MarketIcon className={style.icon} />
        <h2 className={style.identifyContainer__h2}>La esquina del sabor</h2>
      </div>
      <div className={style.identifyContainer}>
        <h3 className={style.identifyContainer__h3}>{username}</h3>
      </div>
    </div>
  );
}
