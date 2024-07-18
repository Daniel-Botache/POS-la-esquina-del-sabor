import style from "../styles/CellBalance.module.css";

type CellBalanceProps = {
  date: string;
  totalSpent: number;
  balance: number;
  totalProfit: number;
  percentageProfit: number;
  totalBase: number;
};

export default function CellBalance({
  totalProfit,
  date,
  totalSpent,
  balance,
  percentageProfit,
  totalBase,
}: CellBalanceProps) {
  const fromatedBalance = new Intl.NumberFormat("es-CO").format(balance);
  const formattedDateCreate = new Date(date).toLocaleDateString();

  return (
    <div className={style.principalContainer}>
      <div className={style.prepertyContainer}>{formattedDateCreate}</div>
      <div className={style.prepertyContainer}>{totalSpent}</div>
      <div className={style.prepertyContainer}>{totalProfit}</div>
      <div className={style.prepertyContainer}>{totalBase}</div>
      <div className={style.prepertyContainer}>{fromatedBalance}</div>
      <div className={style.prepertyContainer}>{percentageProfit} %</div>
    </div>
  );
}
