import style from "../styles/CreateBaseModal.module.css";
import { postBase } from "../services/postBase";
import { useState } from "react";
import { useCustomSelector } from "../../../store/hooks";
import { errorMessage } from "../../auth/hooks/notifications";

type CreateBaseModalProps = {
  onClose: () => void;
};

export default function CreateBaseModal({ onClose }: CreateBaseModalProps) {
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [total, setTotal] = useState(0);
  const [observation, setObservation] = useState("");
  const useId = useCustomSelector((state) => state.auth.userId);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const submitHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (date !== "" && type !== "" && total !== 0) {
      const base = {
        date: date,
        type: type,
        total: total,
        observation: observation,
        userId: useId,
      };
      postBase(base);
      return;
    }
    errorMessage("Debe completar los campos con *");
  };

  const dateHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateInput = event.target.value;
    const isoDate = new Date(dateInput).toISOString();
    const parseDate = Date.parse(isoDate) + 86400000;
    const formateDate = new Date(parseDate).toISOString();
    setDate(formateDate);
  };

  const typeHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const typeInput = event.target.value;
    setType(typeInput);
  };

  const totalHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const totalInput = Number(event.target.value);
    setTotal(totalInput);
  };

  const observationHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const observationInput = event.target.value;
    setObservation(observationInput);
  };
  return (
    <div className={style.modalOverlay}>
      <div className={style.principalContainer}>
        <div className={style.closeButtonContainer}>
          <button onClick={handleClose} className={style.closeButton}>
            X
          </button>
        </div>
        <form className={style.formContainer} onSubmit={submitHandle}>
          <h2> Agregar Base</h2>
          <div className={style.inputContainer}>
            <label htmlFor="dateInput">Fecha: *</label>
            <input
              type="date"
              id="dateInput"
              className={style.form__inputText}
              onChange={dateHandle}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="typeSelect">Tipo:*</label>
            <select
              name="typeSelect"
              id="typeSelect"
              className={style.form__inputText}
              onChange={typeHandle}
            >
              <option value="">Seleccionar tipo</option>
              <option value="Base">Base</option>
              <option value="Mios">Mios</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="observationInput">Observación:</label>
            <input
              type="text"
              id="observationInput"
              className={style.form__inputText}
              onChange={observationHandle}
            />
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
            Agregar Base
          </button>
        </form>
      </div>
    </div>
  );
}
