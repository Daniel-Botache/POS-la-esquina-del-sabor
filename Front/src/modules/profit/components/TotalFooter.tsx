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
  const fromatedPrice = new Intl.NumberFormat("es-CO").format(total);
  const formatedSpent = new Intl.NumberFormat("es-CO").format(totalSpent);
  const formatedSales = new Intl.NumberFormat("es-CO").format(totalSales);
  return (
    <div className={style.principalContainer}>
      <h3 className={style.principalContainer_h3}>
        Total Verdura:{" "}
        <span className={style.principalContainer_span_red}>
          {formatedSpent}
        </span>
      </h3>
      <h3 className={style.principalContainer_h3}>
        Total Ventas:{" "}
        <span className={style.principalContainer_span_blue}>
          {formatedSales}
        </span>
      </h3>
      <h3 className={style.principalContainer_h3}>
        Total:{" "}
        <span className={style.principalContainer_span}>{fromatedPrice}</span>{" "}
      </h3>
      <button className={style.principalContainer__btn}>Mostrar Gráfico</button>
    </div>
  );
}
