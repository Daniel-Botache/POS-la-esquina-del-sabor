import style from "../styles/CellClient.module.css";
import { Client } from "../redux/clientSlice";
import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon, DetailIcon } from "../../../utils/Icons/icons";
import { putClient } from "../services/putClient";
import CreateClientModal from "./CreateClientModal";
import { deleteClient } from "../services/deleteClient";
import { succesMessage, errorMessage } from "../../auth/hooks/notifications";
import { changeDeleteStatus } from "../../Inventory/redux/stockSlice";
import { useCustomDispatch } from "../../../store/hooks";

type ClientProps = Client & {
  onCheckboxChange: (client: { id: string }) => void;
};

export default function CellCLient({
  id,
  name,
  tel,
  address,
  ban,
  quotaMax,
  clientType,
  remainingQuota,
  lastPayment,

  onCheckboxChange,
}: ClientProps) {
  const [colorBackground, setColorBackground] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useCustomDispatch();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCheckboxChange = () => {
    onCheckboxChange({ id: id.toString() });
  };

  const formatedRemainingQuotaHandle = new Intl.NumberFormat("es-CO").format(
    remainingQuota
  );

  const calculateTotalCreditHandle = quotaMax - remainingQuota;

  const calculateClientType = () => {
    if (calculateDayPastDueHandle() > 30) {
      setColorBackground(style.redBackground);
      return "Moroso";
    } else if (
      calculateDayPastDueHandle() > 15 &&
      calculateDayPastDueHandle() < 30
    ) {
      setColorBackground(style.greyBackground);
      return "Regular";
    }
    setColorBackground(style.greenBackground);
    return "VIP";
  };

  const calculateDayPastDueHandle = () => {
    const nowDate = new Date().getTime();
    if (lastPayment !== null && quotaMax > 0) {
      const timeLastPayment = new Date(lastPayment).getTime();
      const diferenceTime = nowDate - timeLastPayment / 86400000;
      return diferenceTime;
    }
    return 0;
  };

  useEffect(() => {
    const client = {
      id,
      name,
      tel,
      address,
      ban,
      remainingQuota,
      quotaMax,
      lastPayment,

      clientType: calculateClientType(),
    };

    putClient(id, client);
  }, []);

  const deleteClientHandle = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const confirm = window.confirm(
      "Seguro desea eliminar completamente a este cliente, no podrá recuperar ninguno de los datos relacionados"
    );
    if (confirm) {
      const deletedClient = await deleteClient(id);
      if (deletedClient) {
        dispatch(changeDeleteStatus());
        succesMessage("Cliente eliminado completamente");
        return;
      }
      errorMessage("Problema con el servidor actualice la página");
      return;
    }
    return;
  };

  return (
    <div className={style.principalContainer}>
      <div className={style.prepertyContainer__check}>
        <input type="checkbox" name="" id="" onChange={handleCheckboxChange} />
      </div>
      <div className={style.prepertyContainer}>{id}</div>
      <div className={style.prepertyContainer}>{name}</div>
      <div className={style.prepertyContainer}>{clientType}</div>
      <div className={style.prepertyContainer}>{lastPayment}</div>
      <div className={`${style.prepertyContainer} ${colorBackground}`}>
        {calculateDayPastDueHandle()}
      </div>
      <div className={style.prepertyContainer}>
        {formatedRemainingQuotaHandle}
      </div>
      <div className={style.prepertyContainer}>
        {calculateTotalCreditHandle}
      </div>

      <div className={style.prepertyContainer_options}>
        <button
          className={style.prepertyContainer__btn}
          onClick={deleteClientHandle}
        >
          <DeleteIcon className={style.prepertyContainer__deleteIcon} />
        </button>
        <button className={style.prepertyContainer__btn} onClick={toggleModal}>
          <EditIcon className={style.prepertyContainer__editIcon} />
        </button>
        <button className={style.prepertyContainer__btn}>
          <DetailIcon className={style.prepertyContainer__detailIcon} />
        </button>
      </div>
      {isModalOpen && (
        <CreateClientModal
          edit={true}
          id={id}
          name={name}
          tel={tel}
          address={address}
          ban={ban}
          quotaMax={quotaMax}
          onClose={toggleModal}
        />
      )}
    </div>
  );
}
