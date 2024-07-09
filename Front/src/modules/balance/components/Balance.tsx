import style from "../styles/balance.module.css";
import { SearchIcon } from "../../../utils/Icons/icons";
import { useState } from "react";

export default function Balance() {
  const [filterInitialDate, setFilterInitialDate] = useState("");
  const [filterFinalDate, setFilterFinalDate] = useState("");
  const [typeSort, setTypeSort] = useState("");

  return (
    <div className={style.principalContainer}>
      <div className={style.headContainer}>
        <div className={style.optionContainer}>
          <div className={style.inputContainer}>
            <label htmlFor="desdeDate" className={style.inputContainer__label}>
              Desde:
            </label>
            <input
              onChange={(e) => setFilterInitialDate(e.target.value)}
              type="date"
              name=""
              id="desdeDate"
              className={style.inputContainer__input}
            />
            <label htmlFor="hastaDate" className={style.inputContainer__label}>
              Hasta:
            </label>
            <input
              onChange={(e) => setFilterFinalDate(e.target.value)}
              type="date"
              name=""
              id="hastaDate"
              className={style.inputContainer__input}
            />
          </div>
          <button className={style.principalContainer__btn}>
            <SearchIcon className={style.principalContainer_icon} />
          </button>
        </div>
        <div className={style.optionContainer}>
          <label htmlFor="balanceType" className={style.inputContainer__label}>
            {" "}
            Tipo de ganancia
          </label>
          <select
            name="balanceType"
            id="balanceType"
            className={style.optionContainer__select}
          >
            <option value="">Todos</option>
            <option value="cash">Efectivo</option>
            <option value="transaction">Transferencia</option>
          </select>
        </div>
      </div>
      <div className={style.titleContainer}>
        <h3 className={style.titleContainer__h3}>
          Fecha:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "creationDateSort" ? "▼" : "▶"}
          </span>
        </h3>

        <h3 className={style.titleContainer__h3}>
          Gasto:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "spentTotalSort" ? "▼" : "▶"}
          </span>
        </h3>

        <h3 className={style.titleContainer__h3}>
          Ingreso Total:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "totalSort" ? "▼" : "▶"}
          </span>
        </h3>

        <h3 className={style.titleContainer__h3}>
          Balance:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "balanceSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>
          Ganancia %:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "perentageSort" ? "▼" : "▶"}
          </span>
        </h3>
      </div>
    </div>
  );
}
