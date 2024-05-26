import { postNewTypes } from "../services/postNewType";
import { useState } from "react";
import style from "../styles/CreateTypeModal.module.css";
import { AddIcon, CancelIcon } from "../../../utils/Icons/icons";

type CreateTypeModalProps = {
  onClose: () => void;
};

export default function CreateTypeModal({ onClose }: CreateTypeModalProps) {
  const [newType, setNewType] = useState("");

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const capitaliceName = capitalizeFirstLetter(newType);
    const response = await postNewTypes(capitaliceName);
    setNewType("");
    if (response) {
      handleClose();
    }
  };

  return (
    <div className={style.modalOverlay}>
      <div className={style.principalContainer}>
        <h2 className={style.principalContainer__h2}>
          Agregar clasificación de producto
        </h2>
        <form onSubmit={handleSubmit} className={style.formContainer}>
          <div className={style.inputContainer}>
            <label htmlFor="inputName">Tipo de producto:</label>
            <input
              className={style.form__inputText}
              value={newType}
              type="text"
              id="inputName"
              onChange={(e) => setNewType(e.target.value)}
            />
          </div>
          <div className={style.modalBtnContainer}>
            <button
              onClick={handleClose}
              type="button"
              className={style.modalBtnContainer__cancelBtn}
            >
              <CancelIcon className={style.modalBtnContainer__cancelIcon} />
              Cancelar
            </button>
            <button type="submit" className={style.modalBtnContainer__btn}>
              <AddIcon className={style.modalBtnContainer__icon} />
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
