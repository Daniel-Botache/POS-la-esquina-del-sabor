import style from "../styles/Stock.module.css";
import SeachBar from "../../searchBar/components/SearchBar";
import { DeleteIcon, AddIcon, FilterIcon } from "../../../utils/Icons/icons";
import Table from "./Table";
import CreateSupplierModal from "../../createSupplierModal/components/CreateSupplierModal";
import React, { useState, useEffect } from "react";
import CreateProductModal from "../../createProductModal/components/CreateProductModal";
import {
  getTypes,
  getSuppliers,
} from "../../createProductModal/redux/createProductSlice";
import { useCustomDispatch, useCustomSelector } from "../../../store/hooks";
import { getProductByBarNameCopy } from "../../searchBar/redux/searchSlice";
import { SearchIcon } from "../../../utils/Icons/icons";

export default function Stock() {
  const [isModalSupplierOpen, setIsModalSupplierOpen] = useState(false);
  const [isModalProductOpen, setIsModalProductOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const suppliers = useCustomSelector((state) => state.createProduct.suppliers);
  const types = useCustomSelector((state) => state.createProduct.types);
  const products = useCustomSelector(
    (state) => state.search.searchProductByName
  );

  const [filterSuplier, setFilterSuplier] = useState("todos");
  const [filterType, setFilterType] = useState("todos");
  const [filterBale, setFilterBale] = useState("todos");
  const [filterQuantySince, setFilterQuantySince] = useState(0);
  const [filterQuantyTo, setFilterQuantyTo] = useState(Infinity);
  const [filterInitialDate, setFilterInitialDate] = useState(0);
  const [filterFinalDate, setFilterFinalDate] = useState(0);

  const dispatch = useCustomDispatch();
  useEffect(() => {
    dispatch(getTypes());
    dispatch(getSuppliers());
    dispatch(getProductByBarNameCopy({ searchProductByNameCopy: products }));
  }, [dispatch]);
  useEffect(() => {}, []);

  const toggleModalFilters = () => {
    setIsFiltersModalOpen(!isFiltersModalOpen);
  };

  const toggleModalSupplier = () => {
    setIsModalSupplierOpen(!isModalSupplierOpen);
  };
  const toggleModalProduct = () => {
    setIsModalProductOpen(!isModalProductOpen);
  };

  const handleFilterByQuanty = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const initialDate = filterInitialDate ? new Date(filterInitialDate) : null;
    const finalDate = filterFinalDate ? new Date(filterFinalDate) : null;
    if (initialDate) initialDate.setHours(0, 0, 0, 0);
    if (finalDate) finalDate.setHours(23, 59, 59, 999);
    const filteredProducts = products.filter((product) => {
      const productDate = new Date(product.lastVolumeDate);
      productDate.setHours(0, 0, 0, 0);
      const matchDate =
        !initialDate ||
        !finalDate ||
        (productDate >= initialDate && productDate <= finalDate);
      const matchVolume =
        filterQuantySince <= product.volume && product.volume <= filterQuantyTo;
      const matchesType =
        filterType === "todos" || product.typeId === filterType;
      const matchesSupplier =
        filterSuplier === "todos" ||
        product.supliers.some((s) => s.id === filterSuplier);
      const matchesBale =
        filterBale === "todos" ||
        (filterBale === "Paca" ? product.bale === true : product.bale == null);
      return (
        matchesType &&
        matchesSupplier &&
        matchesBale &&
        matchVolume &&
        matchDate
      );
    });
    dispatch(
      getProductByBarNameCopy({ searchProductByNameCopy: filteredProducts })
    );
  };

  const handleFilterDateInitial = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = event.target.value;
    if (date == "") {
      setFilterInitialDate(0);
      return;
    }
    const isoDate = new Date(date).toISOString();
    const parseDate = Date.parse(isoDate) + 86400000;
    console.log(`Esta es la seleccion Inicial${parseDate}`);
    setFilterInitialDate(parseDate);
  };

  const handleFilterDateFinal = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = event.target.value;
    if (date == "") {
      setFilterInitialDate(0);
      return;
    }
    const isoDate = new Date(date).toISOString();
    const parseDate = Date.parse(isoDate) + 86400000;
    console.log(`Esta es la seleccion final${isoDate}`);
    setFilterFinalDate(parseDate);
  };

  const handleQuantySinceFilter = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const quanty = Number(event.target.value);
    if (event.target.value == "") {
      setFilterQuantySince(0);
      return;
    }
    setFilterQuantySince(quanty);
  };

  const handleQuantyToFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quanty = Number(event.target.value);
    if (event.target.value == "" || quanty == 0) {
      setFilterQuantyTo(Infinity);
      return;
    }
    setFilterQuantyTo(quanty);
  };

  const handleBaleFilterSelected = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const baleFilter = event.target.value;
    setFilterBale(baleFilter);

    const filteredProducts = products.filter((product) => {
      const matchVolume =
        filterQuantySince <= product.volume && product.volume <= filterQuantyTo;
      const matchesType =
        filterType === "todos" || product.typeId === filterType;
      const matchesSupplier =
        filterSuplier === "todos" ||
        product.supliers.some((s) => s.id === filterSuplier);
      const matchesBale =
        baleFilter === "todos" ||
        (baleFilter === "Paca" ? product.bale === true : product.bale == null);

      return matchesType && matchesSupplier && matchesBale && matchVolume;
    });

    dispatch(
      getProductByBarNameCopy({ searchProductByNameCopy: filteredProducts })
    );
  };

  const handleTypeSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const typeIdSelected = event.target.value;
    setFilterType(typeIdSelected);
    const filteredProducts = products.filter((product) => {
      const matchVolume =
        filterQuantySince <= product.volume && product.volume <= filterQuantyTo;
      const matchesType =
        typeIdSelected === "todos" || product.typeId === typeIdSelected;
      const matchesSupplier =
        filterSuplier === "todos" ||
        product.supliers.some((s) => s.id === filterSuplier);
      const matchesBale =
        filterBale === "todos" ||
        (filterBale === "Paca" ? product.bale === true : product.bale == null);

      return matchesType && matchesSupplier && matchesBale && matchVolume;
    });

    dispatch(
      getProductByBarNameCopy({ searchProductByNameCopy: filteredProducts })
    );
  };

  const handleSuplierSelected = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const supplierId = event.target.value;
    setFilterSuplier(supplierId);
    const filteredProducts = products.filter((product) => {
      const matchVolume =
        filterQuantySince <= product.volume && product.volume <= filterQuantyTo;
      const matchesType =
        filterType === "todos" || product.typeId === filterType;
      const matchesSupplier =
        supplierId === "todos" ||
        product.supliers.some((s) => s.id === supplierId);
      const matchesBale =
        filterBale === "todos" ||
        (filterBale === "Paca" ? product.bale === true : product.bale == null);

      return matchesType && matchesSupplier && matchesBale && matchVolume;
    });

    dispatch(
      getProductByBarNameCopy({ searchProductByNameCopy: filteredProducts })
    );
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
              onChange={handleFilterDateInitial}
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
              onChange={handleFilterDateFinal}
              type="date"
              name=""
              id="hastaDate"
              className={style.inputContainer__input}
            />
          </div>
        </div>
        <div className={style.optionContainer}>
          <h3 className={style.optionContainer__h3}>Proveedor:</h3>
          <select
            name=""
            id=""
            defaultValue={"todos"}
            className={style.optionContainer__select}
            onChange={handleSuplierSelected}
          >
            <option value="todos">Todos</option>
            {suppliers.map((suplier) => (
              <option key={suplier.id} value={suplier.id}>
                {suplier.company}
              </option>
            ))}
          </select>
        </div>
        <div className={style.optionContainer}>
          <h3 className={style.optionContainer__h3}>Tipo de producto:</h3>
          <select
            name=""
            id=""
            className={style.optionContainer__select}
            defaultValue={"todos"}
            onChange={handleTypeSelected}
          >
            <option value="todos">Todos</option>
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div className={style.optionContainer}>
          <h3 className={style.optionContainer__h3}>Cantidad de producto:</h3>
          <select
            onChange={handleBaleFilterSelected}
            name=""
            id=""
            defaultValue={"todos"}
            className={style.optionContainer__select}
          >
            <option value="todos">Todos</option>
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
              onChange={handleQuantySinceFilter}
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
              onChange={handleQuantyToFilter}
            />
            <button
              className={style.principalContainer__btn}
              onClick={handleFilterByQuanty}
            >
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
