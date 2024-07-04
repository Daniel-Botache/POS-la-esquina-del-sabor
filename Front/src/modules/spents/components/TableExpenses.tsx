import style from "../styles/TableExpenses.module.css";
import { useCustomSelector } from "../../../store/hooks";
import CellExpenses from "./CellExpenses";
import warningIcon from "../../../utils/Icons/73028warning_109526.svg";

export default function TableExpenses() {
  const expenses = useCustomSelector((state) => state.spent.expensesCopy);
  return (
    <div className={style.principalContainer}>
      <div>
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <CellExpenses
              key={expense.id}
              id={expense.id}
              type={expense.type}
              createdAt={expense.createdAt}
              userId={expense.userId}
              suplierId={expense.suplierId}
              total={expense.total}
              description={expense.description}
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
              Gastos no encontrados
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
