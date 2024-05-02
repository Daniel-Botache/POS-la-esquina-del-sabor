import MenuCard from "./MenuCard";
import salesImg from "../../../utils/images/ventas.jpg";
import stockImg from "../../../utils/images/inventario.jpg";
import creditImg from "../../../utils/images/creditos.jpg";
import profitImg from "../../../utils/images/ingresos.jpg";
import expenseImg from "../../../utils/images/gastos.jpg";
import balanceImg from "../../../utils/images/balance.jpg";
import basesImg from "../../../utils/images/base.jpg";
import optionsImg from "../../../utils/images/opciones.jpg";
import styles from "../styles/Home.module.css";
export default function Home() {
  return (
    <div className={styles.principalContainer}>
      <MenuCard title={"Ventas"} img={salesImg}></MenuCard>
      <MenuCard title={"Inventario"} img={stockImg}></MenuCard>
      <MenuCard title={"Créditos"} img={creditImg}></MenuCard>
      <MenuCard title={"Ganancias"} img={profitImg}></MenuCard>
      <MenuCard title={"Gastos"} img={expenseImg}></MenuCard>
      <MenuCard title={"Balance"} img={balanceImg}></MenuCard>
      <MenuCard title={"Bases"} img={basesImg}></MenuCard>
      <MenuCard title={"Opciones"} img={optionsImg}></MenuCard>
    </div>
  );
}
