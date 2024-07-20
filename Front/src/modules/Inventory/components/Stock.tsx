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
import { deleteProductService } from "../services/deleteProductService";
import { changeDeleteStatus } from "../redux/stockSlice";

interface Suplier {
  id: string;
  company: string;
  tel: string;
  adviser: string;
  createdAt: Date;
  updatedAt: Date;
}
interface Product {
  id: number;
  name: string;
  type: string;
  volume: number;
  maximum: number;
  barCode: string;
  price: number;
  spent: boolean;
  createdAt: string;
  updatedAt: Date;
  productId: number;
  supliers?: Suplier[];
  bale: boolean | null;
  lastVolumeDate: string;
}

export default function Stock() {
  const [isModalSupplierOpen, setIsModalSupplierOpen] = useState(false);
  const [isModalProductOpen, setIsModalProductOpen] = useState(false);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const suppliers = useCustomSelector((state) => state.createProduct.suppliers);
  const types = useCustomSelector((state) => state.createProduct.types);
  const products = useCustomSelector(
    (state) => state.search.searchProductByName
  );
  const productsCopy = useCustomSelector(
    (state) => state.search.searchProductByNameCopy
  );
  const deleted = useCustomSelector((state) => state.stock.deleted);

  const [filterSuplier, setFilterSuplier] = useState("todos");
  const [filterType, setFilterType] = useState("todos");
  const [filterBale, setFilterBale] = useState("todos");
  const [filterQuantySince, setFilterQuantySince] = useState(0);
  const [filterQuantyTo, setFilterQuantyTo] = useState(Infinity);
  const [filterInitialDate, setFilterInitialDate] = useState(0);
  const [filterFinalDate, setFilterFinalDate] = useState(0);
  const [typeSort, setTypeSort] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState<
    CheckedProduct[]
  >([]);

  type CheckedProduct = {
    id: string;
    bale: boolean | null;
  };

  const handleCheckboxChange = (productId: {
    id: string;
    bale: boolean | null;
  }) => {
    setSelectedProductIds((prevSelectedProductIds) =>
      prevSelectedProductIds.some((product) => product.id === productId.id)
        ? prevSelectedProductIds.filter(
            (product) => product.id !== productId.id
          )
        : [...prevSelectedProductIds, productId]
    );
  };

  const handleDeleteProduct = (id: any, bale: boolean | null) => {
    let route = bale ? "bale" : "product";

    deleteProductService(id, route);
    dispatch(changeDeleteStatus());
  };

  const handleDeleteSelectedProducts = () => {
    const userConfirm = confirm(`¿Seguro desea eliminar los productos?`);
    if (userConfirm) {
      selectedProductIds.forEach((id) => {
        const product = products.find(
          (product) => product.id.toString() === id.id
        );
        if (product) {
          handleDeleteProduct(product.id.toString(), product.bale);
        }
      });
    }
    setSelectedProductIds([]);
  };

  const dispatch = useCustomDispatch();

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getSuppliers());
    dispatch(getProductByBarNameCopy({ searchProductByNameCopy: products }));
  }, [deleted, dispatch]);

  const toggleModalFilters = () => {
    setIsFiltersModalOpen(!isFiltersModalOpen);
  };

  const toggleModalSupplier = () => {
    setIsModalSupplierOpen(!isModalSupplierOpen);
  };
  const toggleModalProduct = () => {
    setIsModalProductOpen(!isModalProductOpen);
  };

  const sortByPrice = (event: React.MouseEvent<HTMLHRElement>) => {
    event.preventDefault();
    if (typeSort == "priceSort") {
      setTypeSort("");
      const arraySorted = [...productsCopy].sort(
        (a: Product, b: Product) => b.price - a.price
      );
      dispatch(
        getProductByBarNameCopy({ searchProductByNameCopy: arraySorted })
      );
      return;
    }
    setTypeSort("priceSort");
    const arraySorted = [...productsCopy].sort(
      (a: Product, b: Product) => a.price - b.price
    );
    dispatch(getProductByBarNameCopy({ searchProductByNameCopy: arraySorted }));
  };

  const sortByLastVolumeDate = (event: React.MouseEvent<HTMLHRElement>) => {
    event.preventDefault();
    if (typeSort == "lastVolumeDateSort") {
      setTypeSort("");
      const arraySorted = [...productsCopy].sort((a: Product, b: Product) =>
        b.lastVolumeDate?.localeCompare(a.lastVolumeDate)
      );
      dispatch(
        getProductByBarNameCopy({ searchProductByNameCopy: arraySorted })
      );
      return;
    }
    setTypeSort("lastVolumeDateSort");
    const arraySorted = [...productsCopy].sort((a: Product, b: Product) =>
      a.lastVolumeDate?.localeCompare(b.lastVolumeDate)
    );
    dispatch(getProductByBarNameCopy({ searchProductByNameCopy: arraySorted }));
  };

  const sortByCreationDate = (event: React.MouseEvent<HTMLHRElement>) => {
    event.preventDefault();
    if (typeSort == "creationDateSort") {
      setTypeSort("");
      const arraySorted = [...productsCopy].sort((a: Product, b: Product) =>
        b.createdAt?.localeCompare(a.createdAt)
      );
      dispatch(
        getProductByBarNameCopy({ searchProductByNameCopy: arraySorted })
      );
      return;
    }
    setTypeSort("creationDateSort");
    const arraySorted = [...productsCopy].sort((a: Product, b: Product) =>
      a.createdAt?.localeCompare(b.createdAt)
    );
    dispatch(getProductByBarNameCopy({ searchProductByNameCopy: arraySorted }));
  };

  const sortByMaximum = (event: React.MouseEvent<HTMLHRElement>) => {
    event.preventDefault();
    if (typeSort == "maximumSort") {
      setTypeSort("");
      const arraySorted = [...productsCopy].sort(
        (a: Product, b: Product) => b.maximum - a.maximum
      );
      dispatch(
        getProductByBarNameCopy({ searchProductByNameCopy: arraySorted })
      );
      return;
    }
    setTypeSort("maximumSort");
    const arraySorted = [...productsCopy].sort(
      (a: Product, b: Product) => a.maximum - b.maximum
    );
    dispatch(getProductByBarNameCopy({ searchProductByNameCopy: arraySorted }));
  };

  const sortByVolume = (event: React.MouseEvent<HTMLHRElement>) => {
    event.preventDefault();
    if (typeSort == "volumeSort") {
      setTypeSort("");
      const arraySorted = [...productsCopy].sort(
        (a: Product, b: Product) => b.volume - a.volume
      );
      dispatch(
        getProductByBarNameCopy({ searchProductByNameCopy: arraySorted })
      );
      return;
    }
    setTypeSort("volumeSort");
    const arraySorted = [...productsCopy].sort(
      (a: Product, b: Product) => a.volume - b.volume
    );
    dispatch(getProductByBarNameCopy({ searchProductByNameCopy: arraySorted }));
  };

  const sortByName = (event: React.MouseEvent<HTMLHRElement>) => {
    event.preventDefault();
    if (typeSort == "nameSort") {
      setTypeSort("");
      const arraySorted = [...productsCopy].sort((a: Product, b: Product) =>
        b.name?.localeCompare(a.name)
      );
      dispatch(
        getProductByBarNameCopy({ searchProductByNameCopy: arraySorted })
      );
      return;
    }
    setTypeSort("nameSort");
    const arraySorted = [...productsCopy].sort((a: Product, b: Product) =>
      a.name?.localeCompare(b.name)
    );
    dispatch(getProductByBarNameCopy({ searchProductByNameCopy: arraySorted }));
  };

  const sortByBarCode = (event: React.MouseEvent<HTMLHRElement>) => {
    event.preventDefault();
    if (typeSort == "barCodeSort") {
      setTypeSort("");
      const arraySorted = [...productsCopy].sort((a: Product, b: Product) =>
        b.barCode?.localeCompare(a.barCode)
      );
      dispatch(
        getProductByBarNameCopy({ searchProductByNameCopy: arraySorted })
      );
      return;
    }
    setTypeSort("barCodeSort");
    const arraySorted = [...productsCopy].sort((a: Product, b: Product) =>
      a.barCode?.localeCompare(b.barCode)
    );
    dispatch(getProductByBarNameCopy({ searchProductByNameCopy: arraySorted }));
  };

  const sortById = (event: React.MouseEvent<HTMLHRElement>) => {
    event.preventDefault();
    if (typeSort == "idSort") {
      setTypeSort("");
      const arraySorted = [...productsCopy].sort((a: Product, b: Product) =>
        b.id.toString().localeCompare(a.id.toString())
      );
      dispatch(
        getProductByBarNameCopy({ searchProductByNameCopy: arraySorted })
      );
      return;
    }
    setTypeSort("idSort");
    const arraySorted = [...productsCopy].sort((a: Product, b: Product) =>
      a.id.toString().localeCompare(b.id.toString())
    );
    dispatch(getProductByBarNameCopy({ searchProductByNameCopy: arraySorted }));
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
          <div
            className={style.headContainer__button}
            onClick={handleDeleteSelectedProducts}
          >
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
        <h3 className={style.titleContainer__h3} onClick={sortById}>
          Id:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "idSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3} onClick={sortByBarCode}>
          Código de barras:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "barCodeSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3} onClick={sortByName}>
          Nombre:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "nameSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>Proveedor:</h3>
        <h3 className={style.titleContainer__h3} onClick={sortByVolume}>
          Cantidad:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "volumeSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3} onClick={sortByMaximum}>
          Tope:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "maximumSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3} onClick={sortByCreationDate}>
          Fecha de creación:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "creationDateSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3} onClick={sortByLastVolumeDate}>
          Fecha de último ingreso:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "lastVolumeDateSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3} onClick={sortByPrice}>
          Precio:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "priceSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>Acciones:</h3>
      </div>
      <Table onCheckboxChange={handleCheckboxChange} />
      {isModalSupplierOpen && (
        <CreateSupplierModal onClose={toggleModalSupplier} />
      )}
      {isModalProductOpen && (
        <CreateProductModal onClose={toggleModalProduct} />
      )}
    </div>
  );
}
