import Cards from "./Cards";
import SeachBar from "../../../searchBar/components/SearchBar";
import style from "../../styles/SearchSide.module.css";
import { AddIcon } from "../../../../utils/Icons/icons";
import CreateProductModal from "../../../createProductModal/components/CreateProductModal";
import { useState } from "react";
type searchProductType = {
  isModal: boolean;
  onClose: () => void;
};

export default function SearchSide({ isModal, onClose }: searchProductType) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };
  return (
    <div className={isModal ? style.modalContainer : style.principalContainer}>
      <div className={isModal ? style.principalModalContainer : style.pepito}>
        {isModal && (
          <div className={style.closeButtonContainer}>
            <button className={style.closeButton} onClick={handleClose}>
              X
            </button>
          </div>
        )}
        <div className={style.headContainer}>
          <SeachBar></SeachBar>
          {!isModal && (
            <div className={style.headContainer__button} onClick={toggleModal}>
              <AddIcon className={style.headContainer__button__icon} />
              <p className={style.headContainer__button__p}>Crear Producto</p>
            </div>
          )}
        </div>
        <Cards isModal={isModal} onClose={handleClose} />
        {isModalOpen && <CreateProductModal onClose={toggleModal} />}
      </div>
    </div>
  );
}
