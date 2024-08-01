import style from "../styles/CreateClientModal.module.css";
import { postClient } from "../services/postClient";
import React, { useState } from "react";
import { idValidation } from "../validations/idValidation";
import { changeDeleteStatus } from "../../Inventory/redux/stockSlice";
import { useCustomDispatch } from "../../../store/hooks";
import { succesMessage, errorMessage } from "../../auth/hooks/notifications";

type CreateClientModalProps = {
  onClose: () => void;
  id: string;
  name: string;
  address: string;
  tel: string;
  ban: boolean;
  edit: boolean;
  quotaMax: number;
};

export default function CreateClientModal({
  onClose,
  id,
  name,
  address,
  tel,
  ban,
  quotaMax,
  edit,
}: CreateClientModalProps) {
  const [idState, setIdState] = useState(id);
  const [nameState, setNameState] = useState(name);
  const [telState, setTelState] = useState(tel);
  const [addressState, setAddressState] = useState(address);
  const [banState, setBanState] = useState(ban);
  const [quotaMaxState, setQuotaMaxState] = useState(quotaMax);
  const [errorId, setErrorId] = useState("");
  const dispatch = useCustomDispatch();

  const changeIdHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value;
    setErrorId(idValidation(Number(id)));
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

  const clearStates = () => {
    setIdState("");
    setNameState("");
    setTelState("");
    setAddressState("");
    setQuotaMaxState(0);
  };

  const submitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const client = {
      id: idState.toString(),
      name: nameState,
      tel: telState,
      address: addressState,
      ban: banState,
      quotaMax: !banState ? 0 : quotaMaxState,
      remainingQuota: !banState ? 0 : quotaMaxState,
      lastPayment: null,
      clientType: "Regular",
    };

    if (errorId == "") {
      const createdClient = await postClient(client);
      if (createdClient.succes) {
        clearStates();
        dispatch(changeDeleteStatus());
        succesMessage(createdClient.message);
        return;
      }
      errorMessage(createdClient.message);
      return;
    }
    errorMessage("El formulario no debe contener errores, revise los campos");
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
        <form className={style.formContainer} onSubmit={submitHandle}>
          <h2> Crear Cliente</h2>
          <div className={style.inputContainer}>
            <label htmlFor="cedulaInput">Cédula: *</label>
            <input
              type="text"
              id="cedulaInput"
              className={style.form__inputText}
              onChange={changeIdHandle}
              value={idState}
              disabled={edit ? true : false}
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
              value={nameState}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="telInput">Teléfono: *</label>
            <input
              type="text"
              id="telInput"
              className={style.form__inputText}
              onChange={changeTelHandle}
              value={telState}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="addressInput">Dirección: </label>
            <input
              type="text"
              id="addressInput"
              className={style.form__inputText}
              onChange={changeAddressHandle}
              value={addressState}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="creditSelect">Crédito:</label>
            <select
              name="creditSelect"
              id="creditSelect"
              className={style.form__inputText}
              onChange={changeBanHandle}
              value={Number(ban)}
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
              value={quotaMaxState}
            />
          </div>

          <button type="submit" className={style.principalContainer__btn}>
            {edit ? "Editar Cliente" : "Crear Cliente"}
          </button>
        </form>
      </div>
    </div>
  );
}
