import style from "../styles/createExpenseModal.module.css";

type CreateExpenseModalProps = {
  onClose: () => void;
};
export default function CreateExpenseModal({
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
        <form className={style.formContainer}>
          <h2> Crear Gasto</h2>
          <div className={style.inputContainer}>
            <label htmlFor="descriptionInput">Descripción: *</label>
            <input
              type="text"
              id="descriptionInput"
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
              <option value="Pago proveedor">Pago proveedor</option>
              <option value="Nomina">Nómina</option>
              <option value="Pago externo">Pago externo</option>
            </select>
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="suplierInput">Proveedor:</label>
            <select
              name=""
              id="suplierInput"
              className={style.form__inputText}
            ></select>
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
            Crear Gasto
          </button>
        </form>
      </div>
    </div>
  );
}
