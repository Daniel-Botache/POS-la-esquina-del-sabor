import style from "../styles/TableBalance.module.css";
import CellBalance from "./CellBalance";
import warningIcon from "../../../utils/Icons/73028warning_109526.svg";

export interface BalanceI {
  date: string;
  totalSpent: number;
  balance: number;
  totalProfit: number;
  percentageProfit: number;
  base: number;
}

type TableBalanceProps = {
  balances: BalanceI[];
};

export default function TableBalance({ balances }: TableBalanceProps) {
  return (
    <div className={style.principalContainer}>
      <div>
        {balances.length > 0 ? (
          balances.map((balance: BalanceI) => (
            <CellBalance
              key={balance.date}
              date={balance.date}
              totalSpent={balance.totalSpent}
              totalProfit={balance.totalProfit}
              balance={balance.balance}
              percentageProfit={balance.percentageProfit}
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
              Bases no encontradas
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
