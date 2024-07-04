import style from "../styles/Spents.module.css";
import { AddIcon, SearchIcon } from "../../../utils/Icons/icons";
import CreateExpenseModal from "./CreateExpenseModal";
import { useEffect, useState } from "react";
import { useCustomDispatch, useCustomSelector } from "../../../store/hooks";
import { getSuppliers } from "../../createProductModal/redux/createProductSlice";

export default function Expenses() {
  const [createExpenseModaOpen, setCreateExpenseModaOpen] = useState(false);
  const [typeSort, setTypeSort] = useState("");
  const dispatch = useCustomDispatch();
  const supliers = useCustomSelector((state) => state.createProduct.suppliers);

  const toggleModalExpense = () => {
    setCreateExpenseModaOpen(!createExpenseModaOpen);
  };

  useEffect(() => {
    dispatch(getSuppliers());
  }, []);

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
          >
            <option value="">Todos</option>
            {supliers.length > 0
              ? supliers.map((suplier) => (
                  <option value={suplier.id}>{suplier.company}</option>
                ))
              : null}
          </select>
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
            <option value="">Todos</option>
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
      <div className={style.titleContainer}>
        <h3 className={style.titleContainer__h3}>Id:</h3>
        <h3 className={style.titleContainer__h3}>Descripción:</h3>
        <h3 className={style.titleContainer__h3}>Proveedor:</h3>
        <h3 className={style.titleContainer__h3}>
          Fecha:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "creationDateSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>
          Total:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "totalSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>
          Usuario:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "totalSort" ? "▼" : "▶"}
          </span>
        </h3>
      </div>
    </div>
  );
}
