import style from "../styles//MovementHistoryTable.module.css";
import { useState, useEffect } from "react";
import { SearchIcon } from "../../../utils/Icons/icons";
import MovementHistoryCell from "./MovementHistoryCell";
import { Sales } from "../../profit/redux/profitSlice";
import { getCreditsByClientId } from "../services/getCreditsByIdClient";
import warningIcon from "../../../utils/Icons/73028warning_109526.svg";

type MovementHistoryTableProps = {
  id: string;
};

export default function MovementHistoryTable({
  id,
}: MovementHistoryTableProps) {
  const [filterInitialDate, setFilterInitialDate] = useState(0);
  const [filterFinalDate, setFilterFinalDate] = useState(0);
  const [creditsPayments, setCreditsPayments] = useState([]);
  const [creditsPaymentsCopy, setCreditsPaymentsCopy] = useState<Sales[]>([]);

  const getCreditsHandle = async () => {
    const creditsById = await getCreditsByClientId(id);
    setCreditsPayments(creditsById);
    setCreditsPaymentsCopy(creditsById);
  };

  useEffect(() => {
    getCreditsHandle();
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
    <div className={style.principalContainer}>
      <div className={style.headContainer}>
        <h2 className={style.headContainer_h2}>Historico de movimientos</h2>
        <div className={style.filterContainer}>
          <div className={style.optionContainer}>
            <div className={style.filterContainer}>
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
        <div className={style.headContainer__button}>
          {<SearchIcon className={style.headContainer__button__icon} />}
          <p className={style.headContainer__button__p}>Mostrar Todos</p>
        </div>
      </div>
      <div className={style.titleContainer}>
        <h3 className={style.titleContainer__h3}>Código</h3>
        <h3 className={style.titleContainer__h3}>Tipo de movimiento</h3>
        <h3 className={style.titleContainer__h3}>Fecha</h3>
        <h3 className={style.titleContainer__h3}>Total</h3>
        <h3 className={style.titleContainer__h3}>Acciones</h3>
      </div>
      <div className={style.billProductContainer}>
        {creditsPaymentsCopy.length > 0 ? (
          creditsPaymentsCopy.map((sale: any) => (
            <MovementHistoryCell
              id={sale.id}
              movementType={sale.movementType}
              createdAt={sale.createdAt}
              total={sale.total}
              clientId={sale.clientId}
              products={sale.products}
              bales={sale.bales}
            />
          ))
        ) : (
          <div className={style.principalContainer_notFound}>
            <img
              src={warningIcon}
              alt="warningIcon"
              className={style.principalContainer_icon}
            />
            <h3 className={style.principalContainer_h3}>
              clientes no encontrados
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
