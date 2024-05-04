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

export default function NavBarLeft() {
  return (
    <div className={style.principalContainer}>
      <VentasIcon title="Ventas" className={style.principalContainer__icon} />
      <InvetarioIcon className={style.principalContainer__icon} />
      <CreditoIcon className={style.principalContainer__icon} />
      <GananciasIcon className={style.principalContainer__icon} />
      <GastosIcon className={style.principalContainer__icon} />
      <BalanceIcon className={style.principalContainer__icon} />
      <BaseIcon className={style.principalContainer__icon} />
      <ConfiguracionIcon className={style.principalContainer__icon} />
    </div>
  );
}
