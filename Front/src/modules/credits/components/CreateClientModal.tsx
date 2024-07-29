import style from "../styles/CreateClientModal.module.css";

type CreateClientModalProps = {
  onClose: () => void;
};

export default function CreateClientModal({ onClose }: CreateClientModalProps) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };
  return (
    <div className={style.modalOverlay}>
      <div className={style.principalContainer}>
        <div className={style.closeButtonContainer}>
          <button onClick={handleClose} className={style.closeButton}>
            X
          </button>
        </div>
        <form className={style.formContainer}>
          <h2> Crear Cliente</h2>
          <div className={style.inputContainer}>
            <label htmlFor="cedulaInput">Cédula: *</label>
            <input
              type="text"
              id="cedulaInput"
              className={style.form__inputText}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="nameInput">Nombre: *</label>
            <input
              type="text"
              id="nameInput"
              className={style.form__inputText}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="telInput">Teléfono: *</label>
            <input
              type="text"
              id="telInput"
              className={style.form__inputText}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="addressInput">Dirección: </label>
            <input
              type="text"
              id="addressInput"
              className={style.form__inputText}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="creditSelect">Crédito:</label>
            <select
              name="creditSelect"
              id="creditSelect"
              className={style.form__inputText}
            >
              <option value="false">No</option>
              <option value="true">Si</option>
            </select>
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="quotaMaxInput">Cupo máximo: *</label>
            <input
              type="number"
              id="quotaMaxInput"
              className={style.form__inputText}
            />
          </div>

          <button type="submit" className={style.principalContainer__btn}>
            Crear Cliente
          </button>
        </form>
      </div>
    </div>
  );
}
