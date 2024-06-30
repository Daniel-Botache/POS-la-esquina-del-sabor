import style from "../styles/Spents.module.css";
import { AddIcon, SearchIcon } from "../../../utils/Icons/icons";
import CreateExpenseModal from "./CreateExpenseModal";
import { useState } from "react";

export default function Expenses() {
  const [createExpenseModaOpen, setCreateExpenseModaOpen] = useState(false);

  const toggleModalExpense = () => {
    setCreateExpenseModaOpen(!createExpenseModaOpen);
  };

  return (
    <div className={style.principalContainer}>
      <div className={style.headContainer}>
        <div className={style.optionContainer}>
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
          <button className={style.principalContainer__btn}>
            <SearchIcon className={style.principalContainer_icon} />
          </button>
        </div>
        <div className={style.optionContainer}>
          <label htmlFor="suplierInput" className={style.inputContainer__label}>
            {" "}
            Proveedor:
          </label>
          <select
            name="suplierInput"
            id="suplierInput"
            className={style.optionContainer__select}
          ></select>
        </div>
        <div className={style.optionContainer}>
          <label htmlFor="typeInput" className={style.inputContainer__label}>
            {" "}
            Tipo:
          </label>
          <select
            name="typeInput"
            id="typeInput"
            className={style.optionContainer__select}
          >
            <option value="">Seleccionar tipo</option>
            <option value="Pago proveedor">Pago proveedor</option>
            <option value="Nomina">Nómina</option>
            <option value="Pago externo">Pago externo</option>
          </select>
        </div>
        <div
          className={style.headContainer__button}
          onClick={toggleModalExpense}
        >
          <AddIcon className={style.headContainer__button__icon} />
          <p className={style.headContainer__button__p}>Agregar gasto</p>
        </div>
        {createExpenseModaOpen && (
          <CreateExpenseModal onClose={toggleModalExpense} />
        )}
      </div>
    </div>
  );
}
