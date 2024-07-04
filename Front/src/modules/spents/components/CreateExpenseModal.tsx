import style from "../styles/createExpenseModal.module.css";
import { useCustomSelector, useCustomDispatch } from "../../../store/hooks";
import { getSuppliers } from "../../createProductModal/redux/createProductSlice";
import { useEffect, useState } from "react";
import { postExpense } from "../services/postExpense";
import { errorMessage } from "../../auth/hooks/notifications";

type CreateExpenseModalProps = {
  onClose: () => void;
};
export default function CreateExpenseModal({
  onClose,
}: CreateExpenseModalProps) {
  const user = useCustomSelector((state) => state.auth.userId);
  const supliers = useCustomSelector((state) => state.createProduct.suppliers);
  const dispatch = useCustomDispatch();
  const [description, setDescription] = useState("");
  const [total, setTotal] = useState(0);
  const [type, setType] = useState("");
  const [selectedSupplier, setSelectedSuplier] = useState("");

  const descriptionHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const descriptionInput = event.target.value;
    setDescription(descriptionInput);
  };
  const totalHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const totalInput = Number(event.target.value);
    setTotal(totalInput);
  };

  const typeHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const typeSelected = event.target.value;
    setType(typeSelected);
  };

  const suplierHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const suplierSelected = event.target.value;
    setSelectedSuplier(suplierSelected);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const expense = {
      total: total,
      suplierId: selectedSupplier,
      description: description,
      type: type,
      userId: user,
    };
    if (total == 0 || type == "") {
      errorMessage(
        "Debe ingresar un valor numérico para el gasto y seleccionar un tipo"
      );
      return;
    }
    postExpense(expense);
  };

  useEffect(() => {
    dispatch(getSuppliers());
  }, []);

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
