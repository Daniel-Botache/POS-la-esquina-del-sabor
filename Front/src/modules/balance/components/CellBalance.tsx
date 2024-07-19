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
  const fotmatedBase = new Intl.NumberFormat("es-CO").format(totalBase);
  const formatedSpent = new Intl.NumberFormat("es-CO").format(totalSpent);
  const formatedprofit = new Intl.NumberFormat("es-CO").format(totalProfit);
  const formattedDateCreate = new Date(date).toLocaleDateString();

  return (
    <div className={style.principalContainer}>
      <div className={style.prepertyContainer}>{formattedDateCreate}</div>
      <div className={style.prepertyContainer}>{formatedSpent}</div>
      <div className={style.prepertyContainer}>{formatedprofit}</div>
      <div className={style.prepertyContainer}>{fotmatedBase}</div>
      <div className={style.prepertyContainer}>{fromatedBalance}</div>
      <div className={style.prepertyContainer}>{percentageProfit} %</div>
    </div>
  );
}
