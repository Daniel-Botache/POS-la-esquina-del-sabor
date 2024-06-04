import {
  GananciasIcon,
  InvetarioIcon,
  CreditoIcon,
  VentasIcon,
  ConfiguracionIcon,
  BalanceIcon,
  BaseIcon,
  GastosIcon,
} from "../../../utils/Icons/icons";
import style from "../styles/NavBarLeft.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
//
export default function NavBarLeft() {
  const location = useLocation();
  if (location.pathname == "/") {
    return null;
  }
  return (
    <div className={style.principalContainer}>
      <Link to="/sales">
        <div title="Ventas">
          <VentasIcon className={style.principalContainer__icon} />
        </div>
      </Link>
      <Link to="/stock">
        <div title="Inventario">
          <InvetarioIcon className={style.principalContainer__icon} />
        </div>
      </Link>
      <Link to="/credits">
        <div title="Créditos">
          <CreditoIcon className={style.principalContainer__icon} />
        </div>
      </Link>
      <Link to="/profit">
        <div title="Ganancias">
          <GananciasIcon className={style.principalContainer__icon} />
        </div>
      </Link>
      <Link to="/expenses">
        <div title="Gastos">
          <GastosIcon className={style.principalContainer__icon} />
        </div>
      </Link>
      <Link to="/balance">
        <div title="Balance">
          <BalanceIcon className={style.principalContainer__icon} />
        </div>
      </Link>
      <Link to="/bases">
        {" "}
        <div title="Bases">
          <BaseIcon className={style.principalContainer__icon} />
        </div>
      </Link>
      <Link to="/options">
        <div title="Configuración">
          <ConfiguracionIcon className={style.principalContainer__icon} />
        </div>
      </Link>
    </div>
  );
}
