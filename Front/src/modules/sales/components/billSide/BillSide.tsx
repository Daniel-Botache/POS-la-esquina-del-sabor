import style from "../../styles/BillSide.module.css";
import CellList from "./CellList";
import { addProductBill } from "../../redux/billSlice";
import { useState } from "react";
import { useCustomDispatch } from "../../../../store/hooks";
import { searchByBarCode } from "../../services/searchByBarCodeService";

export default function BillSide() {
  const [codigoBarras, setCodigoBarras] = useState("");
  const dispatch = useCustomDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodigoBarras(e.target.value);
  };
  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchByBarCode(codigoBarras).then((producto) => {
        dispatch(addProductBill({ product: producto, quantity: 1 }));
      });
      setCodigoBarras("");
    }
  };

  return (
    <div className={style.principalContainer}>
      <div className={style.titleContainer}>
        <h1>Facturar</h1>
      </div>
      <div className={style.clientContainer}>
        <h4 className={style.principalContainer__h4}>Cliente:</h4>
        <input
          type="text"
          placeholder="Cédula"
          className={style.principalContainer__input}
        />
      </div>
      <div className={style.insertProductContainer}>
        <h4 className={style.principalContainer__h4}>Cod barras</h4>
        <input
          type="text"
          placeholder="Código"
          className={style.principalContainer__input}
          onChange={handleInputChange}
          onKeyDown={handleInputEnter}
          value={codigoBarras}
        />
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
