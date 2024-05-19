import Cards from "./Cards";
import SeachBar from "../../../searchBar/components/SearchBar";
import style from "../../styles/SearchSide.module.css";
import { AddIcon } from "../../../../utils/Icons/icons";
import CreateProductModal from "../../../createProductModal/components/CreateProductModal";
import { useState } from "react";

export default function SearchSide() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className={style.principalContainer}>
      <div className={style.headContainer}>
        <SeachBar></SeachBar>
        <div className={style.headContainer__button} onClick={toggleModal}>
          <p className={style.headContainer__button__p}>Crear Producto</p>
          <AddIcon className={style.headContainer__button__icon} />
        </div>
      </div>
      <Cards />
      {isModalOpen && <CreateProductModal onClose={toggleModal} />}
    </div>
  );
}
