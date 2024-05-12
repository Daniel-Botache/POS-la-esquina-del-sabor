import style from "../../styles/BillSide.module.css";
import CellList from "./CellList";
import { addProductBill } from "../../redux/billSlice";
import { useState } from "react";
import { useCustomDispatch, useCustomSelector } from "../../../../store/hooks";
import { searchByBarCode } from "../../services/searchByBarCodeService";

export default function BillSide() {
  const [barCode, setbarCode] = useState("");
  const dispatch = useCustomDispatch();
  const productsSelected = useCustomSelector((state) => state.bill.products);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setbarCode(e.target.value);
  };
  const handleInputEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const response = await searchByBarCode(barCode);
      if (response) {
        dispatch(addProductBill({ product: response, quantity: 1 }));
        setbarCode("");
        return;
      }
      setbarCode("");
    }
  };

  const calculateTotal = () => {
    return Object.values(productsSelected).reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };
  const calculateTotalProduct = () => {
    return Object.values(productsSelected).reduce((total, product) => {
      return total + product.quantity;
    }, 0);
  };
  return (
    <div className={style.principalContainer}>
      <div className={style.titleContainer}>
        <h1 className={style.titleContainer__h1}>Factura</h1>
        <div className={style.clientContainer}>
          <h4 className={style.principalContainer__h4}>Cliente:</h4>
          <input
            type="text"
            placeholder="Cédula"
            className={style.principalContainer__input}
          />
        </div>
      </div>

      <div className={style.insertProductContainer}>
        <h4 className={style.principalContainer__h4}>Cod barras:</h4>
        <input
          type="text"
          placeholder="Código"
          className={style.principalContainer__input}
          onChange={handleInputChange}
          onKeyDown={handleInputEnter}
          value={barCode}
        />
      </div>
      <div className={style.billContainer}>
        <div className={style.billTitleContainer}>
          <h3 className={style.billTitleContainer__h3}>Cod. Barras</h3>
          <h3 className={style.billTitleContainer__h3}>Producto</h3>
          <h3 className={style.billTitleContainer__h3}>Precio</h3>
          <h3 className={style.billTitleContainer__h3}>Cantidad</h3>
          <h3 className={style.billTitleContainer__h3}>Total</h3>
        </div>
        <div className={style.billProductContainer}>
          {Object.entries(productsSelected).map(([productId, productData]) => (
            <CellList
              key={productId}
              barCode={productData.barCode}
              productName={productData.name}
              quantity={productData.quantity}
              price={productData.price}
              total={productData.price * productData.quantity}
            />
          ))}
        </div>
      </div>
      <div className={style.closeSaleContainer}>
        <h3
          className={`${style.closeSaleContainer__h3} ${style.closeSaleContainer__h3_title}`}
        >
          Cerrar Factura
        </h3>
        <h3 className={style.closeSaleContainer__h3}>
          Total:{" "}
          <span className={style.closeSaleContainer__span}>
            {" "}
            {calculateTotal()}
          </span>
        </h3>
      </div>
      <div className={style.cancelSaleContainer}>
        <p className={style.cancelSaleContainer__p}>
          {calculateTotalProduct()} Productos
        </p>
        <button className={style.cancelSaleContainer__btn}>Cancelar</button>
      </div>
    </div>
  );
}
