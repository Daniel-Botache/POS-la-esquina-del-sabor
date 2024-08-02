import style from "../styles/ClientDetailModal.module.css";
import { Client } from "../redux/clientSlice";
import { useState, useEffect } from "react";

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
  const [filterInitialDate, setFilterInitialDate] = useState(0);
  const [filterFinalDate, setFilterFinalDate] = useState(0);

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

  const formatedRemainingQuotaHandle = new Intl.NumberFormat("es-CO").format(
    remainingQuota
  );

  const formatedQuotaMaxHandle = new Intl.NumberFormat("es-CO").format(
    quotaMax
  );

  useEffect(() => {
    calculateColorType();
  }, []);

  const handleFilterDateInitial = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = event.target.value;
    if (date == "") {
      setFilterInitialDate(0);
      return;
    }
    const isoDate = new Date(date).toISOString();
    const parseDate = Date.parse(isoDate) + 86400000;
    console.log(`Esta es la seleccion Inicial${parseDate}`);
    setFilterInitialDate(parseDate);
  };

  const handleFilterDateFinal = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = event.target.value;
    if (date == "") {
      setFilterInitialDate(0);
      return;
    }
    const isoDate = new Date(date).toISOString();
    const parseDate = Date.parse(isoDate) + 86400000;
    console.log(`Esta es la seleccion final${isoDate}`);
    setFilterFinalDate(parseDate);
  };

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
              <div className={style.filterContainer}>
                <div className={style.optionContainer}>
                  <div className={style.filterContainer}>
                    {" "}
                    <div className={style.inputContainer}>
                      <label
                        htmlFor="desdeDate"
                        className={style.inputContainer__label}
                      >
                        Desde:
                      </label>
                      <input
                        onChange={handleFilterDateInitial}
                        type="date"
                        name=""
                        id="desdeDate"
                        className={style.inputContainer__input}
                      />
                    </div>
                    <div className={style.inputContainer}>
                      <label
                        htmlFor="hastaDate"
                        className={style.inputContainer__label}
                      >
                        Hasta:
                      </label>
                      <input
                        onChange={handleFilterDateFinal}
                        type="date"
                        name=""
                        id="hastaDate"
                        className={style.inputContainer__input}
                      />
                    </div>
                  </div>
                </div>
              </div>
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
      </div>
    </div>
  );
}
