import style from "../styles/Profit.module.css";
import { useEffect, useState } from "react";
import { getSalesToday } from "../services/getSalesToday";
import { getSaleByClientId } from "../services/getSaleByClientId";
import { getSaleBySaleId } from "../services/getSaleBySaleId";
import { getSalesByDate } from "../services/getSalesByDate";
import { addSales } from "../redux/profitSlice";
import { useCustomDispatch, useCustomSelector } from "../../../store/hooks";
import TableProfit from "./TablePorfit";

export default function Profit() {
  const dispatch = useCustomDispatch();
  const [typeSort, setTypeSort] = useState("");
  const [inputId, setInputId] = useState("");
  const sales = useCustomSelector((state) => state.profit.sales);
  const [filterInitialDate, setFilterInitialDate] = useState("");
  const [filterFinalDate, setFilterFinalDate] = useState("");

  const getSalesTodayHandler = async () => {
    const data = await getSalesToday();
    dispatch(addSales({ sales: data }));
  };

  const searchByClienIdHandle = async () => {
    const data = await getSaleByClientId(inputId);
    dispatch(addSales({ sales: data }));
  };

  const searchBySaleIdHandle = async () => {
    const data = await getSaleBySaleId(inputId);
    dispatch(addSales({ sales: data }));
  };

  const searchByDateHandle = async () => {
    const data = await getSalesByDate(filterInitialDate, filterFinalDate);
    dispatch(addSales({ sales: data }));
  };

  useEffect(() => {
    getSalesTodayHandler();
  }, []);

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
            onChange={(e) => setInputId(e.target.value)}
          />
          <div className={style.buttonsContainer}>
            <button
              className={style.principalContainer__btn}
              onClick={searchByClienIdHandle}
            >
              Buscar por ID cliente
            </button>
            <button
              className={style.principalContainer__btn}
              onClick={searchBySaleIdHandle}
            >
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
              onChange={(e) => setFilterInitialDate(e.target.value)}
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
              onChange={(e) => setFilterFinalDate(e.target.value)}
            />
          </div>
          <button
            className={style.principalContainer__btn}
            onClick={searchByDateHandle}
          >
            Buscar por Fecha
          </button>
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
      <TableProfit />
    </div>
  );
}
