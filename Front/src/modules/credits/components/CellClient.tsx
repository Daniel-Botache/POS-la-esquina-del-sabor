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
import ClientDetailModal from "./ClientDetailModal";

type ClientProps = Client & {};

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
}: ClientProps) {
  const [colorBackground, setColorBackground] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpem] = useState(false);
  const dispatch = useCustomDispatch();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleDetailModal = () => {
    setIsDetailModalOpem(!isDetailModalOpen);
  };

  const formatedRemainingQuotaHandle = new Intl.NumberFormat("es-CO").format(
    remainingQuota
  );

  const calculateTotalCreditHandle = quotaMax - remainingQuota;

  const calculateClientType = () => {
    if (calculateDayPastDueHandle() > 35) {
      setColorBackground(style.redBackground);
      const client = {
        ban: true,
      };
      putClient(id, client);
      return "Moroso";
    } else if (
      calculateDayPastDueHandle() > 20 &&
      calculateDayPastDueHandle() < 35
    ) {
      const client = {
        ban: false,
      };
      putClient(id, client);
      setColorBackground(style.greyBackground);
      return "Regular";
    }
    const client = {
      ban: false,
    };
    putClient(id, client);
    setColorBackground(style.greenBackground);
    return "VIP";
  };

  const calculateDayPastDueHandle = () => {
    const nowDate = new Date().getTime();
    if (lastPayment !== null && quotaMax > 0) {
      const timeLastPayment = new Date(lastPayment).getTime();
      const diferenceTime = Math.floor((nowDate - timeLastPayment) / 86400000);
      return diferenceTime;
    }
    return 0;
  };
  const formattedDateCreate = lastPayment
    ? new Date(lastPayment).toLocaleDateString()
    : "";
  useEffect(() => {
    const client = {
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
      <div className={style.prepertyContainer}>{ban ? "No" : "Si"}</div>
      <div className={style.prepertyContainer}>{id}</div>
      <div className={style.prepertyContainer}>{name}</div>
      <div className={style.prepertyContainer}>{clientType}</div>
      <div className={style.prepertyContainer}>{formattedDateCreate}</div>
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
        <button
          className={style.prepertyContainer__btn}
          onClick={toggleDetailModal}
        >
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
          remainingQuota={remainingQuota}
        />
      )}
      {isDetailModalOpen && (
        <ClientDetailModal
          id={id}
          name={name}
          tel={tel}
          address={address}
          ban={ban}
          quotaMax={quotaMax}
          lastPayment={lastPayment}
          remainingQuota={remainingQuota}
          clientType={clientType}
          dayPastDue={calculateDayPastDueHandle()}
          onClose={toggleDetailModal}
        />
      )}
    </div>
  );
}
