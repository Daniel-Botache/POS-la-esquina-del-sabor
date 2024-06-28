import style from "../styles/TotalFooter.module.css";

type TotalFooterProps = {
  totalSpent: number;
  totalSales: number;
  total: number;
};

export default function TotalFooter({
  total,
  totalSpent,
  totalSales,
}: TotalFooterProps) {
  return (
    <div className={style.principalContainer}>
      <div>
        <h3>Total Verdura: {totalSpent}</h3>
        <h3>Total Ventas: {totalSales}</h3>
        <h3>Total: {total} </h3>
        <button>Mostrar Gráfico</button>
      </div>
    </div>
  );
}
