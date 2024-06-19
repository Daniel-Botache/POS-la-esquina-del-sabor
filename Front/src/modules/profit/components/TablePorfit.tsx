import style from "../styles/TableProfit.module.css";
import CellProfit from "./CellProfit";
import { useCustomSelector } from "../../../store/hooks";

export default function TableProfit() {
  const sales = useCustomSelector((state) => state.profit.sales);
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
          <h2>Facturas no encontradas</h2>
        )}
      </div>
    </div>
  );
}
