import style from "../styles/CreateBaseModal.module.css";

type CreateBaseModalProps = {
  onClose: () => void;
};

export default function CreateBaseModal({ onClose }: CreateBaseModalProps) {
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
          <h2> Agregar Base</h2>
          <div className={style.inputContainer}>
            <label htmlFor="dateInput">Fecha: *</label>
            <input
              type="date"
              id="dateInput"
              className={style.form__inputText}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="typeSelect">Tipo:</label>
            <select
              name="typeSelect"
              id="typeSelect"
              className={style.form__inputText}
            >
              <option value="">Seleccionar tipo</option>
              <option value="Base">Base</option>
              <option value="Mios">Mios</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className={style.inputContainer}>
            <label htmlFor="totalInput">Total: *</label>
            <input
              type="number"
              id="totalInput"
              className={style.form__inputText}
            />
          </div>

          <button type="submit" className={style.principalContainer__btn}>
            Agregar Base
          </button>
        </form>
      </div>
    </div>
  );
}
