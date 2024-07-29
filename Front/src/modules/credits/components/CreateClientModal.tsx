import style from "../styles/CreateClientModal.module.css";

export default function CreateClientModal() {
  return (
    <div className={style.modalOverlay}>
      <div className={style.principalContainer}>
        <div className={style.closeButtonContainer}>
          <button onClick={handleClose} className={style.closeButton}>
            X
          </button>
        </div>
        <form className={style.formContainer} onSubmit={handleSubmit}>
          <h2> Crear Gasto</h2>
          <div className={style.inputContainer}>
            <label htmlFor="descriptionInput">Descripción: *</label>
            <input
              type="text"
              id="descriptionInput"
              className={style.form__inputText}
              onChange={descriptionHandle}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="typeSelect">Tipo:</label>
            <select
              onChange={typeHandle}
              name="typeSelect"
              id="typeSelect"
              className={style.form__inputText}
              value={type}
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
              onChange={suplierHandle}
              value={selectedSupplier}
            >
              <option value="">Seleccionar Proveedor</option>
              {supliers.length > 0 ? (
                supliers.map((suplier) => (
                  <option value={suplier.id}>{suplier.company}</option>
                ))
              ) : (
                <option value="">seleccione proveedor</option>
              )}
            </select>
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="totalInput">Total: *</label>
            <input
              type="number"
              id="totalInput"
              className={style.form__inputText}
              onChange={totalHandle}
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
