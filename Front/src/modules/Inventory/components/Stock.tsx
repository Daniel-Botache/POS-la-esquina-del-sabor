import style from "../styles/Stock.module.css";
import SeachBar from "../../searchBar/components/SearchBar";
import { DeleteIcon, AddIcon, FilterIcon } from "../../../utils/Icons/icons";
import Table from "./Table";
import CreateSupplierModal from "../../createSupplierModal/components/CreateSupplierModal";
import { useState } from "react";
import CreateProductModal from "../../createProductModal/components/CreateProductModal";

export default function Stock() {
  const [isModalSupplierOpen, setIsModalSupplierOpen] = useState(false);
  const [isModalProductOpen, setIsModalProductOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const toggleModalFilters = () => {
    setIsFiltersModalOpen(!isFiltersModalOpen);
  };

  const toggleModalSupplier = () => {
    setIsModalSupplierOpen(!isModalSupplierOpen);
  };
  const toggleModalProduct = () => {
    setIsModalProductOpen(!isModalProductOpen);
  };

  return (
    <div className={style.principalContainer}>
      <div className={style.searchBarContainer}>
        <SeachBar />
        <div className={style.orderContainer}>
          <div className={style.headContainer__button}>
            <DeleteIcon className={style.headContainer__button__icon} />
            <p className={style.headContainer__button__p}>Eliminar selección</p>
          </div>
          <div
            className={style.headContainer__button}
            onClick={toggleModalProduct}
          >
            <AddIcon className={style.headContainer__button__icon} />
            <p className={style.headContainer__button__p}>Crear Producto</p>
          </div>
          <div
            className={style.headContainer__button}
            onClick={toggleModalSupplier}
          >
            <AddIcon className={style.headContainer__button__icon} />
            <p className={style.headContainer__button__p}>Crear Proveedor</p>
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
          <h3>Última fecha de ingreso:</h3>
          <div className={style.inputContainer}>
            <label htmlFor="">Desde</label>
            <input type="date" name="" id="" />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="">Hasta</label>
            <input type="date" name="" id="" />
          </div>
        </div>
        <div className={style.optionContainer}>
          <h3>Proveedor</h3>
          <select name="" id=""></select>
        </div>
        <div className={style.optionContainer}>
          <h3>Tipo de producto:</h3>
          <select name="" id=""></select>
        </div>
        <div className={style.optionContainer}>
          <h3>Cantidad en inventario:</h3>
          <div className={style.inputContainer}>
            <label htmlFor="">Desde</label>
            <input type="text" name="" id="" />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="">Hasta</label>
            <input type="text" name="" id="" />
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
        <h3 className={style.titleContainer__h3}>Id:</h3>
        <h3 className={style.titleContainer__h3}>Código de barras:</h3>
        <h3 className={style.titleContainer__h3}>Nombre:</h3>
        <h3 className={style.titleContainer__h3}>Proveedor:</h3>
        <h3 className={style.titleContainer__h3}>Cantidad:</h3>
        <h3 className={style.titleContainer__h3}>Tope:</h3>
        <h3 className={style.titleContainer__h3}>Fecha de creación:</h3>
        <h3 className={style.titleContainer__h3}>Fecha de último ingreso:</h3>
        <h3 className={style.titleContainer__h3}>Precio:</h3>
        <h3 className={style.titleContainer__h3}>Acciones:</h3>
      </div>
      <Table />
      {isModalSupplierOpen && (
        <CreateSupplierModal onClose={toggleModalSupplier} />
      )}
      {isModalProductOpen && (
        <CreateProductModal onClose={toggleModalProduct} />
      )}
    </div>
  );
}