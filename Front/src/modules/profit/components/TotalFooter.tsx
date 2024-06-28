import style from "../styles/TotalFooter.module.css";

type TotalFooterProps = {
  totals: {
    total: number;
    totalSpent: number;
    totalCash: number;
    totalTrans: number;
  };
};

export default function TotalFooter({ totals }: TotalFooterProps) {
  const fromatedPrice = new Intl.NumberFormat("es-CO").format(totals.total);
  const formatedSpent = new Intl.NumberFormat("es-CO").format(
    totals.totalSpent
  );
  const formatedSales = new Intl.NumberFormat("es-CO").format(
    totals.total - totals.totalSpent
  );
  const fotmatedTrans = new Intl.NumberFormat("es-CO").format(
    totals.totalTrans
  );
  const fotmatedCash = new Intl.NumberFormat("es-CO").format(totals.totalCash);
  return (
    <div className={style.principalContainer}>
      <h3 className={style.principalContainer_h3}>
        Total Efectivo:{" "}
        <span className={style.principalContainer_span}> {fotmatedCash}</span>{" "}
      </h3>
      <h3 className={style.principalContainer_h3}>
        Total Transferencia:{" "}
        <span className={style.principalContainer_span}>{fotmatedTrans}</span>
      </h3>
      <h3 className={style.principalContainer_h3}>
        Total Verdura:{" "}
        <span className={style.principalContainer_span_red}>
          {formatedSpent}
        </span>
      </h3>
      <h3 className={style.principalContainer_h3}>
        Total Tienda:{" "}
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
