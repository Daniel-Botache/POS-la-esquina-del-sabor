import style from "../styles/CellClient.module.css";
import { Client } from "../redux/clientSlice";
import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon, DetailIcon } from "../../../utils/Icons/icons";
import { putClient } from "../services/putClient";

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
        <button className={style.prepertyContainer__btn}>
          <DeleteIcon className={style.prepertyContainer__deleteIcon} />
        </button>
        <button className={style.prepertyContainer__btn}>
          <EditIcon className={style.prepertyContainer__editIcon} />
        </button>
        <button className={style.prepertyContainer__btn}>
          <DetailIcon className={style.prepertyContainer__detailIcon} />
        </button>
      </div>
      {/*   {isModalOpen && (
        <EditProductModal id={id} bale={bale} onClose={handleOpenModal} />
      )} */}
    </div>
  );
}
