import { postNewTypes } from "../services/postNewType";
import { useState } from "react";
import style from "../styles/CreateTypeModal.module.css";

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
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await postNewTypes(newType);
    setNewType("");
    if (response) {
      handleClose();
    }
  };

  return (
    <div className={style.modalOverlay}>
      <div className={style.principalContainer}>
        <h2>crear clasificación de producto</h2>
        <form onSubmit={handleSubmit} className={style.formContainer}>
          <div>
            <label htmlFor="inputName">Tipo de producto:</label>
            <input
              value={newType}
              type="text"
              id="inputName"
              onChange={(e) => setNewType(e.target.value)}
            />
          </div>
          <button type="submit">Crear</button>
          <button onClick={handleClose} type="button">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
