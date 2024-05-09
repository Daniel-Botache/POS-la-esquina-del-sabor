import style from "../../styles/BillSide.module.css";
import CellList from "./CellList";

export default function BillSide() {
  return (
    <div className={style.principalContainer}>
      <div className={style.titleContainer}>
        <h1>Facturar</h1>
        <p>icon</p>
      </div>
      <div className={style.clientContainer}>
        <h4>Cliente:</h4>
        <input type="text" placeholder="Cédula" />
      </div>
      <div className={style.insertProductContainer}>
        <h4>Cod barras</h4>
        <input type="text" placeholder="Código" />
      </div>
      <div className={style.billContainer}>
        <div className={style.billTitleContainer}>
          <h3>Producto</h3>
          <h3>Cantidad</h3>
          <h3>Total</h3>
        </div>
        <div className={style.billProductContainer}></div>
        <div className={style.closeSale}>
          <button>Cerrar Factura</button>
          <h3>Total: </h3>
        </div>
        <div className={style.cancelSale}>
          <p>Productos</p>
          <button>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
