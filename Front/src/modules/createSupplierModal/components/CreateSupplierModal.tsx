import style from "../styles/CreateSupplierModal.module.css";
import { useState } from "react";
import { postNewSupplier } from "../services/postSupplier";
import { errorMessage, succesMessage } from "../../auth/hooks/notifications";
import { putSupplier } from "../services/putSupplier";
import { changeDeleteStatus } from "../../Inventory/redux/stockSlice";
import { useCustomDispatch } from "../../../store/hooks";

interface Supplier {
  company: string;
  adviser: string;
  tel: string;
}

type CreateSupplierModalProps = {
  onClose: () => void;
  id: string;
  edit: boolean;
  company: string;
  adviser: string;
  tel: string;
};

export default function CreateSupplierModal({
  onClose,
  company,
  adviser,
  tel,
  edit,
  id,
}: CreateSupplierModalProps) {
  const dispatch = useCustomDispatch();
  const [newSupplier, setNewSupplier] = useState<Supplier>({
    company: company,
    adviser: adviser,
    tel: tel,
  });

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newSupplier.company == "") {
      errorMessage("Debe agregar por lo menos el nombre de la empresa");
      return;
    }
    if (edit) {
      try {
        const editedSuplier = await putSupplier(id, newSupplier);
        if (editedSuplier) {
          succesMessage("Proveedor editado correctamente");
          dispatch(changeDeleteStatus());
          handleClose();
          return;
        }
        return errorMessage("Debe agregar los campos correspondientes");
      } catch (error) {
        return errorMessage(
          "Problema al editar proveedor verifique el servidor"
        );
      }
    }

    const response = await postNewSupplier(newSupplier);
    setNewSupplier({
      company: "",
      adviser: "",
      tel: "",
    });
    if (response) {
      dispatch(changeDeleteStatus());
      handleClose();
    }
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
          <button className={style.closeButton} onClick={handleClose}>
            X
          </button>
        </div>
        <form className={style.formContainer} onSubmit={handleSubmit}>
          <h2> Crear Proveedor</h2>
          <div className={style.inputContainer}>
            <label htmlFor="compayInput">Empresa: *</label>
            <input
              value={newSupplier.company}
              onChange={(e) =>
                setNewSupplier((prevState) => ({
                  ...prevState,
                  company: capitalizeFirstLetter(e.target.value),
                }))
              }
              type="text"
              id="compayInput"
              className={style.form__inputText}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="adviserInput">Asesor:</label>
            <input
              value={newSupplier.adviser}
              onChange={(e) =>
                setNewSupplier((prevState) => ({
                  ...prevState,
                  adviser: capitalizeFirstLetter(e.target.value),
                }))
              }
              type="text"
              id="adviserInput"
              className={style.form__inputText}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="telInput">Teléfono:</label>
            <input
              value={newSupplier.tel}
              onChange={(e) =>
                setNewSupplier((prevState) => ({
                  ...prevState,
                  tel: e.target.value,
                }))
              }
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
