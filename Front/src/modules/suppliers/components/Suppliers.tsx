import style from "../styles/Supliers.module.css";
import SearchBarSupplier from "./SearchBarSupplier";
import { AddIcon } from "../../../utils/Icons/icons";
import CreateSupplierModal from "../../createSupplierModal/components/CreateSupplierModal";
import { useState } from "react";
import { useCustomSelector, useCustomDispatch } from "../../../store/hooks";
import { Supplier } from "../redux/supplierSlice";
import { addSupplierCopy } from "../redux/supplierSlice";
import TableSuppliers from "./TableSuppliers";

export default function Suppliers() {
  const [isModalCreateSupplierOpen, setIsModalCreateSupplierOpen] =
    useState(false);
  const [typeSort, setTypeSort] = useState("");
  const dispatch = useCustomDispatch();

  const toggleModalCreateSupplier = () => {
    setIsModalCreateSupplierOpen(!isModalCreateSupplierOpen);
  };

  const suppliersCopy = useCustomSelector(
    (state) => state.suppliers.suppliersCopy
  );

  const sortByName = (event: React.MouseEvent<HTMLHRElement>) => {
    event.preventDefault();
    if (typeSort == "nameSort") {
      setTypeSort("");
      const arraySorted = [...suppliersCopy].sort((a: Supplier, b: Supplier) =>
        b.company?.localeCompare(a.company)
      );
      dispatch(addSupplierCopy({ suppliersCopy: arraySorted }));
      return;
    }
    setTypeSort("nameSort");
    const arraySorted = [...suppliersCopy].sort((a: Supplier, b: Supplier) =>
      a.company?.localeCompare(b.company)
    );
    dispatch(addSupplierCopy({ suppliersCopy: arraySorted }));
  };
  return (
    <div className={style.principalContainer}>
      <div className={style.searchBarContainer}>
        <SearchBarSupplier />
        <div className={style.orderContainer}>
          <div
            className={style.headContainer__button}
            onClick={toggleModalCreateSupplier}
          >
            <AddIcon className={style.headContainer__button__icon} />
            <p className={style.headContainer__button__p}>Crear Proveedor</p>
          </div>
        </div>
      </div>
      <div className={style.titleContainer}>
        <h3 className={style.titleContainer__h3} onClick={sortByName}>
          Empresa:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "nameSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>Asesor: </h3>
        <h3 className={style.titleContainer__h3}>Teléfono:</h3>
        <h3 className={style.titleContainer__h3}>
          Fecha de Creación:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "lastPaymentSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>
          Total de productos:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "remainingQuotaSort" ? "▼" : "▶"}
          </span>
        </h3>

        <h3 className={style.titleContainer__h3}>Acciones:</h3>
      </div>
      {isModalCreateSupplierOpen && (
        <CreateSupplierModal onClose={toggleModalCreateSupplier} />
      )}
      <TableSuppliers />
    </div>
  );
}
