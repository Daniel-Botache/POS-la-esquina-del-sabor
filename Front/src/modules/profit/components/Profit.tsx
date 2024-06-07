import style from "../styles/Profit.module.css";
import { useState } from "react";

export default function Profit() {
  const [typeSort, setTypeSort] = useState("");
  return (
    <div className={style.principalContainer}>
      <div className={style.searchContainer}>
        <div
          className={`${style.optionContainer} ${style.optionContainer__search} `}
        >
          <input
            type="text"
            id="inputSaleId"
            placeholder="Buscar Factura"
            className={style.optionContainer__input}
          />
          <div className={style.buttonsContainer}>
            <button className={style.principalContainer__btn}>
              Buscar por ID cliente
            </button>
            <button className={style.principalContainer__btn}>
              Buscar por ID factura
            </button>
          </div>
        </div>
        <div className={style.optionContainer}>
          <h3 className={style.optionContainer__h3}>Fecha de factura:</h3>
          <div className={style.inputContainer}>
            <label htmlFor="desdeDate" className={style.inputContainer__label}>
              Desde:
            </label>
            <input
              type="date"
              name=""
              id="desdeDate"
              className={style.inputContainer__input}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="hastaDate" className={style.inputContainer__label}>
              Hasta:
            </label>
            <input
              type="date"
              name=""
              id="hastaDate"
              className={style.inputContainer__input}
            />
          </div>
        </div>
        <div className={style.optionContainer}>
          <h3 className={style.optionContainer__h3}>Tipo de factura:</h3>

          <div className={style.inputContainer}>
            <label htmlFor="saleRadio" className={style.inputContainer__label}>
              Ventas
            </label>
            <input
              defaultChecked
              type="checkbox"
              name="optionRadio"
              id="saleRadio"
              className={style.inputContainer__input_chk}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="payment" className={style.inputContainer__label}>
              Abonos
            </label>
            <input
              defaultChecked
              type="checkbox"
              name="optionRadio"
              id="payment"
              className={style.inputContainer__input_chk}
            />
          </div>
        </div>
        <div className={style.optionContainer}>
          <h3 className={style.optionContainer__h3}>Tipo de factura:</h3>
          <div className={style.inputContainer}>
            <label htmlFor="cash" className={style.inputContainer__label}>
              Efectivo
            </label>
            <input
              defaultChecked
              type="checkbox"
              name="optionCheck"
              id="cash"
              className={style.inputContainer__input_chk}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="trans" className={style.inputContainer__label}>
              Transaccion
            </label>
            <input
              defaultChecked
              type="checkbox"
              name="optionCheck"
              id="trans"
              className={style.inputContainer__input_chk}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="mix" className={style.inputContainer__label}>
              Mixto
            </label>
            <input
              defaultChecked
              type="checkbox"
              name="optionCheck"
              id="mix"
              className={style.inputContainer__input_chk}
            />
          </div>
        </div>
      </div>
      <div className={style.titleContainer}>
        <h3 className={style.titleContainer__h3}>
          Id:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "idSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>
          Cliente:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "barCodeSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>
          Descripcion:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "nameSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>Tipo de pago:</h3>
        <h3 className={style.titleContainer__h3}>
          Fecha:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "volumeSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>
          Valor Efectivo:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "maximumSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>
          Valor Transferencia:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "creationDateSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>
          Total:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "lastVolumeDateSort" ? "▼" : "▶"}
          </span>
        </h3>

        <h3 className={style.titleContainer__h3}>Acciones:</h3>
      </div>
      <div className={style.titleContainer}></div>
    </div>
  );
}
