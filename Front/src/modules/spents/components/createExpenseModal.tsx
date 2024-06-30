import style from "../styles/createExpenseModal.module.css";

type CreateExpenseModalProps = {
  onClose: () => void;
};
export default function createExpenseModal({
  onClose,
}: CreateExpenseModalProps) {
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
        <form>
          <h2> Crear Proveedor</h2>
          <div className={style.inputContainer}>
            <label htmlFor="compayInput">Empresa: *</label>
            <input
              type="text"
              id="compayInput"
              className={style.form__inputText}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="adviserInput">Asesor:</label>
            <input
              type="text"
              id="adviserInput"
              className={style.form__inputText}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="telInput">Teléfono:</label>
            <input
              type="text"
              id="telInput"
              className={style.form__inputText}
            />
          </div>
          <button type="submit" className={style.principalContainer__btn}>
            Crear proveedor
          </button>
        </form>
      </div>
    </div>
  );
}
