import styles from "../styles/Footer.module.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className={styles.principalContainer}>
      <p className={styles.principalContainer__p}>
        Producido por:
        <Link
          to={"https://db-dev-theta.vercel.app/"}
          className={styles.principalContainer__link}
        >
          DB-dev
        </Link>
      </p>
      <Link
        to={"https://github.com/Daniel-Botache/POS-la-esquina-del-sabor"}
        className={styles.principalContainer__link}
      >
        <p className={styles.principalContainer__p}>Soporte</p>
      </Link>
      <p className={styles.principalContainer__p}>
        © 2024 Pomo. Todos los derechos reservados.
      </p>
    </div>
  );
}
