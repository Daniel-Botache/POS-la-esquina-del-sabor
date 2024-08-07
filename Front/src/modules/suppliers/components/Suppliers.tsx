import style from "../styles/Supliers.module.css";
import SearchBarSupplier from "./SearchBarSupplier";
import { AddIcon } from "../../../utils/Icons/icons";
import CreateSupplierModal from "../../createSupplierModal/components/CreateSupplierModal";
import { useState } from "react";

export default function Suppliers() {
  const [isModalCreateSupplierOpen, setIsModalCreateSupplierOpen] =
    useState(false);

  const toggleModalCreateSupplier = () => {
    setIsModalCreateSupplierOpen(!isModalCreateSupplierOpen);
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
      {isModalCreateSupplierOpen && (
        <CreateSupplierModal onClose={toggleModalCreateSupplier} />
      )}
    </div>
  );
}
