import style from "../styles/TableProfit.module.css";
import CellProfit from "./CellProfit";
import { useCustomSelector } from "../../../store/hooks";
import warningIcon from "../../../utils/Icons/73028warning_109526.svg";

export default function TableProfit() {
  const sales = useCustomSelector((state) => state.profit.salesCopy);
  return (
    <div className={style.principalContainer}>
      <div>
        {sales.length > 0 ? (
          sales.map((sale: any) => (
            <CellProfit
              key={sale.id}
              id={sale.id}
              paymentType={sale.paymentType}
              movementType={sale.movementType}
              clientId={sale.clientId ? sale.clientId : 0}
              createdAt={sale.createdAt}
              valueTransaction={sale.valueTransaction}
              valueCash={sale.valueCash}
              total={sale.total}
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
              Facturas no encontradas
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
