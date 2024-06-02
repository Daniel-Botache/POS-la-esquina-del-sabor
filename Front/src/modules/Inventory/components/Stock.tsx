import style from "../styles/Stock.module.css";
import SeachBar from "../../searchBar/components/SearchBar";
import { DeleteIcon, AddIcon, FilterIcon } from "../../../utils/Icons/icons";
import Table from "./Table";
import CreateSupplierModal from "../../createSupplierModal/components/CreateSupplierModal";
import { useState, useEffect } from "react";
import CreateProductModal from "../../createProductModal/components/CreateProductModal";
import {
  getTypes,
  getSuppliers,
} from "../../createProductModal/redux/createProductSlice";
import { useCustomDispatch, useCustomSelector } from "../../../store/hooks";

export default function Stock() {
  const [isModalSupplierOpen, setIsModalSupplierOpen] = useState(false);
  const [isModalProductOpen, setIsModalProductOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const suppliers = useCustomSelector((state) => state.createProduct.suppliers);
  const types = useCustomSelector((state) => state.createProduct.types);

  const dispatch = useCustomDispatch();
  useEffect(() => {
    dispatch(getTypes());
    dispatch(getSuppliers());
  }, [dispatch]);

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
          <h3 className={style.optionContainer__h3}>
            Última fecha de ingreso:
          </h3>
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
          <h3 className={style.optionContainer__h3}>Proveedor:</h3>
          <select name="" id="" className={style.optionContainer__select}>
            {" "}
            {suppliers.map((suplier) => (
              <option key={suplier.id} value={suplier.id}>
                {suplier.company}
              </option>
            ))}
          </select>
        </div>
        <div className={style.optionContainer}>
          <h3 className={style.optionContainer__h3}>Tipo de producto:</h3>
          <select name="" id="" className={style.optionContainer__select}>
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div className={style.optionContainer}>
          <h3 className={style.optionContainer__h3}>Cantidad de producto:</h3>
          <select name="" id="" className={style.optionContainer__select}>
            <option value="Individual">Individual</option>{" "}
            <option value="Paca">Paca</option>
          </select>
        </div>
        <div className={style.optionContainer}>
          <h3 className={style.optionContainer__h3}>Cantidad en inventario:</h3>
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
