import MenuCard from "./menuCard";
import salesImg from "../../../utils/images/ventas.jpg";
import stockImg from "../../../utils/images/inventario.jpg";
import creditImg from "../../../utils/images/creditos.jpg";
import profitImg from "../../../utils/images/ingresos.jpg";
import expenseImg from "../../../utils/images/gastos.jpg";
import balanceImg from "../../../utils/images/balance.jpg";
import basesImg from "../../../utils/images/base.jpg";
import optionsImg from "../../../utils/images/opciones.jpg";
import suplierImg from "../../../utils/images/suppliersImage.jpg";
import styles from "../styles/Home.module.css";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className={styles.principalContainer}>
      <Link to={"/sales"} className={styles.principalContainer__Link}>
        <MenuCard title={"Ventas"} img={salesImg}></MenuCard>
      </Link>
      <Link to={"/stock"} className={styles.principalContainer__Link}>
        <MenuCard title={"Inventario"} img={stockImg}></MenuCard>
      </Link>
      <Link to={"/credits"} className={styles.principalContainer__Link}>
        <MenuCard title={"Créditos"} img={creditImg}></MenuCard>
      </Link>
      <Link to={"/profit"} className={styles.principalContainer__Link}>
        <MenuCard title={"Ganancias"} img={profitImg}></MenuCard>
      </Link>
      <Link to={"/expenses"} className={styles.principalContainer__Link}>
        <MenuCard title={"Gastos"} img={expenseImg}></MenuCard>
      </Link>
      <Link to={"/balance"} className={styles.principalContainer__Link}>
        <MenuCard title={"Balance"} img={balanceImg}></MenuCard>
      </Link>
      <Link to={"/bases"} className={styles.principalContainer__Link}>
        <MenuCard title={"Bases"} img={basesImg}></MenuCard>
      </Link>
      <Link to={"/suppliers"} className={styles.principalContainer__Link}>
        <MenuCard title={"Proveedores"} img={suplierImg}></MenuCard>
      </Link>
      <Link to={"/options"} className={styles.principalContainer__Link}>
        <MenuCard title={"Opciones"} img={optionsImg}></MenuCard>
      </Link>
    </div>
  );
}
