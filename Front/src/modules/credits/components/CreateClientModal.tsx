import style from "../styles/CreateClientModal.module.css";
import { postClient } from "../services/postClient";
import { useState } from "react";
import { idValidation } from "../validations/idValidation";

type CreateClientModalProps = {
  onClose: () => void;
};

export default function CreateClientModal({ onClose }: CreateClientModalProps) {
  const [idState, setIdState] = useState(0);
  const [nameState, setNameState] = useState("");
  const [telState, setTelState] = useState("");
  const [addressState, setAddressState] = useState("");
  const [banState, setBanState] = useState(false);
  const [quotaMaxState, setQuotaMaxState] = useState(0);
  const [errorId, setErrorId] = useState("");

  const changeIdHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(event.target.value);
    setErrorId(idValidation(id));
    setIdState(id);
  };

  const changeNameHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setNameState(name);
  };

  const changeTelHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tel = event.target.value;
    setTelState(tel);
  };

  const changeAddressHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const address = event.target.value;
    setAddressState(address);
  };

  const changeBanHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const ban = Number(event.target.value);
    ban ? setBanState(true) : setBanState(false);
    console.log(ban ? true : false);
  };

  const changeQuotaMaxHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quotaMax = Number(event.target.value);
    setQuotaMaxState(quotaMax);
  };

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
              onChange={changeIdHandle}
            />
          </div>
          {errorId ? (
            <div className={style.inputContainer_error}>
              <label htmlFor="" className={style.inputContainer_label}>
                {errorId}
              </label>
            </div>
          ) : null}

          <div className={style.inputContainer}>
            <label htmlFor="nameInput">Nombre: *</label>
            <input
              type="text"
              id="nameInput"
              className={style.form__inputText}
              onChange={changeNameHandle}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="telInput">Teléfono: *</label>
            <input
              type="text"
              id="telInput"
              className={style.form__inputText}
              onChange={changeTelHandle}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="addressInput">Dirección: </label>
            <input
              type="text"
              id="addressInput"
              className={style.form__inputText}
              onChange={changeAddressHandle}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="creditSelect">Crédito:</label>
            <select
              name="creditSelect"
              id="creditSelect"
              className={style.form__inputText}
              onChange={changeBanHandle}
            >
              <option value={0}>No</option>
              <option value={1}>Si</option>
            </select>
          </div>
          <div
            className={
              banState ? style.inputContainer : style.inputContainer_disabled
            }
          >
            <label htmlFor="quotaMaxInput">Cupo máximo: *</label>
            <input
              type="number"
              id="quotaMaxInput"
              className={style.form__inputText}
              onChange={changeQuotaMaxHandle}
              disabled={banState ? false : true}
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