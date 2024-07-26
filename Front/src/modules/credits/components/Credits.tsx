import style from "../styles/Credits.module.css";
import {
  DeleteIcon,
  AddIcon,
  FilterIcon,
  SearchIcon,
} from "../../../utils/Icons/icons";
import { useState, useEffect } from "react";
import { useCustomDispatch, useCustomSelector } from "../../../store/hooks";
import SearchBarClient from "./SearchBarClient";

export default function Credits() {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [typeSort, setTypeSort] = useState("");

  const toggleModalFilters = () => {
    setIsFiltersModalOpen(!isFiltersModalOpen);
  };

  return (
    <div className={style.principalContainer}>
      <div className={style.searchBarContainer}>
        <SearchBarClient />
        <div className={style.orderContainer}>
          <div className={style.headContainer__button}>
            <DeleteIcon className={style.headContainer__button__icon} />
            <p className={style.headContainer__button__p}>Eliminar selección</p>
          </div>
          <div className={style.headContainer__button}>
            <AddIcon className={style.headContainer__button__icon} />
            <p className={style.headContainer__button__p}>Crear cliente</p>
          </div>
          <div
            className={style.headContainer__button}
            onClick={toggleModalFilters}
          >
            <FilterIcon className={style.headContainer__button__icon} />
            <p className={style.headContainer__button__p}>Filtros</p>
          </div>
        </div>
      </div>
      <div
        className={
          isFiltersModalOpen
            ? style.filterContainer
            : style.filterContainer_hidden
        }
      >
        <div className={style.optionContainer}>
          <h3 className={style.optionContainer__h3}>Última fecha de pago:</h3>
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
        </div>
        <div className={style.optionContainer}>
          <h3 className={style.optionContainer__h3}>Tipo de cliente:</h3>
          <select
            name=""
            id=""
            defaultValue={"todos"}
            className={style.optionContainer__select}
          >
            <option value="todos">Todos</option>
            <option value="VIP">VIP</option>
            <option value="VIP">Regular</option>
            <option value="Moroso">Moroso</option>
          </select>
        </div>

        <div className={style.optionContainer}>
          <h3 className={style.optionContainer__h3}>Total del crédito</h3>
          <div className={style.inputContainer}>
            <label htmlFor="" className={style.inputContainer__label}>
              Desde:
            </label>
            <input
              type="number"
              name=""
              id=""
              className={style.inputContainer__input_number}
            />
            <div className={style.inputContainer__div}></div>
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="" className={style.inputContainer__label}>
              Hasta:
            </label>
            <input
              type="number"
              name=""
              id=""
              className={style.inputContainer__input_number}
            />
            <button className={style.principalContainer__btn}>
              <SearchIcon className={style.principalContainer__icon} />
            </button>
          </div>
        </div>
      </div>
      <div className={style.titleContainer}>
        <input
          type="checkbox"
          name=""
          id=""
          className={style.titleContainer__check}
        />
        <h3 className={style.titleContainer__h3}>
          Cédula:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "idSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>
          Nombre:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "barCodeSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>Tipo de cliente: </h3>
        <h3 className={style.titleContainer__h3}>
          Fecha último abono:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "nameSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>
          Dias de mora:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "volumeSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>
          Cupo restante:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "maximumSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>
          Total crédito{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "creationDateSort" ? "▼" : "▶"}
          </span>
        </h3>

        <h3 className={style.titleContainer__h3}>Acciones:</h3>
      </div>
    </div>
  );
}
