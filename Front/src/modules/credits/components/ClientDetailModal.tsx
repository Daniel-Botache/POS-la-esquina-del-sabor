import style from "../styles/ClientDetailModal.module.css";
import { Client } from "../redux/clientSlice";
import { useState, useEffect } from "react";
import MovementHistoryTable from "./MovementHistoryTable";

type ClientProps = Client & {
  onClose: () => void;
  dayPastDue: number;
};

export default function ClientDetailModal({
  id,
  name,
  tel,
  address,
  ban,
  quotaMax,
  clientType,
  remainingQuota,
  lastPayment,
  dayPastDue,
  onClose,
}: ClientProps) {
  const [colorBackground, setColorBackground] = useState("");

  const calculateColorType = () => {
    if (clientType == "Regular") {
      setColorBackground(style.txtGrayColor);
      return;
    }
    if (clientType == "VIP") {
      setColorBackground(style.txtGreenColor);
      return;
    }
    if (clientType === "Moroso") {
      setColorBackground(style.txtRedColor);
      return;
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const formatedQuotaMaxHandle = new Intl.NumberFormat("es-CO").format(
    quotaMax
  );

  useEffect(() => {
    calculateColorType();
  }, []);

  return (
    <div className={style.modalOverlay}>
      <div className={style.principalContainer}>
        <div className={style.closeButtonContainer}>
          <button onClick={handleClose} className={style.closeButton}>
            X
          </button>
        </div>
        <div className={style.headContainer}>
          <div className={style.tileContainer}>
            <div className={style.infoContainer}>
              <h1 className={style.infoContainer_h1}>{name}</h1>
              <h3 className={style.infoContainer_h3}>C.C: {id}</h3>
            </div>
            <div
              className={`${style.infoContainer_h3} ${style.infoContainer_h3_bottom}`}
            >
              <h3 className={style.infoContainer_h3}>
                Cupo asignado: ${formatedQuotaMaxHandle}
              </h3>
            </div>
            <div className={style.infoContainer}>
              <h3 className={`${style.infoContainer_h3} ${colorBackground}`}>
                Dias sin abonar: {dayPastDue}
              </h3>
              <h3
                className={`${style.infoContainer_h3} ${style.infoContainer_h3_bottom} ${colorBackground}`}
              >
                {clientType}
              </h3>
            </div>
          </div>
        </div>
        <MovementHistoryTable id={id} />
      </div>
    </div>
  );
}
