import { LogoPomo, MarketIcon } from "../../../utils/Icons/icons";
import style from "../styles/Head.module.css";
import { useCustomSelector, useCustomDispatch } from "../../../store/hooks";
import { UserIcon } from "../../../utils/Icons/icons";
import { cleanUserInfo } from "../../auth/redux/authSlice";
import { Link } from "react-router-dom";

export default function Head() {
  const username = useCustomSelector((state) => state.auth.user);
  const dispatch = useCustomDispatch();

  const handleLogOut = () => {
    dispatch(cleanUserInfo());
  };
  return (
    <div className={style.principalContainer}>
      <Link to="/home" className={style.principalContainer__link}>
        <div className={style.logoContainer}>
          <LogoPomo className={style.logo} />
          <h1 className={style.identifyContainer__h1}>Pomo Pos</h1>
        </div>
      </Link>
      <div className={style.companyContainer}>
        <MarketIcon className={style.icon} />
        <h2 className={style.identifyContainer__h2}>La esquina del sabor</h2>
      </div>
      {username && (
        <div className={style.identifyContainer}>
          <UserIcon className={style.iconUser} />
          <h3 className={style.identifyContainer__h3}>{username}▼</h3>
          <div className={style.logoutMenu}>
            <Link to="/useroptions" className={style.logoutMenu__link}>
              <div className={style.optionContainer}>
                <p className={style.optionContainer__p}>Perfil</p>
              </div>
            </Link>
            <Link
              to="/"
              onClick={handleLogOut}
              className={style.logoutMenu__link}
            >
              <div className={style.optionContainer}>
                <p className={style.optionContainer__p}>Cerrar sesión</p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
