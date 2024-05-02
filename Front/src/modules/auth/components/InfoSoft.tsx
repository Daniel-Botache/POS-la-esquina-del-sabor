import {
  LogoPomo,
  GananciasIcon,
  CreditoIcon,
  TimonIcon,
  InvetarioIcon,
} from "../../../utils/Icons/icons";
import styles from "../styles/InfoSoft.module.css";
import softImage from "../../../utils/images/jovenes.png";

export default function InfoSoft() {
  return (
    <div className={styles.principalContainer}>
      <div className={styles.headContainer}>
        <LogoPomo className={styles.logoPomo} />
        <h1 className={styles.headContainer__h1}>POS</h1>
      </div>
      <div className={styles.infoContainer}>
        <GananciasIcon />
        <p className={styles.infoContainer__p}>Aumenta tus ganancias</p>
      </div>
      <div className={styles.infoContainer}>
        <TimonIcon />
        <p className={styles.infoContainer__p}>Controla tus gastos</p>
      </div>
      <div className={styles.infoContainer}>
        <InvetarioIcon />
        <p className={styles.infoContainer__p}>Gestiona tu inventario</p>
      </div>
      <div className={styles.infoContainer}>
        <CreditoIcon />
        <p className={styles.infoContainer__p}>Genera créditos</p>
      </div>

      <img src={softImage} alt="jovenes" className={styles.imgInfo} />
    </div>
  );
}
