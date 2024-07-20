import style from "../styles/Credits.module.css";
import { DeleteIcon, AddIcon, FilterIcon } from "../../../utils/Icons/icons";
import React, { useState, useEffect } from "react";
import { useCustomDispatch, useCustomSelector } from "../../../store/hooks";

export default function Credits() {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const toggleModalFilters = () => {
    setIsFiltersModalOpen(!isFiltersModalOpen);
  };

  return (
    <div className={style.principalContainer}>
      <div className={style.searchBarContainer}>
        <div className={style.orderContainer}>
          <div className={style.headContainer__button}>
            <DeleteIcon className={style.headContainer__button__icon} />
            <p className={style.headContainer__button__p}>Eliminar selección</p>
          </div>
          <div className={style.headContainer__button}>
            <AddIcon className={style.headContainer__button__icon} />
            <p className={style.headContainer__button__p}>Crear Producto</p>
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
    </div>
  );
}
