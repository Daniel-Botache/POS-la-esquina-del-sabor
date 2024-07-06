import style from "../styles/TotalFooter.module.css";

type TotalFooterProps = {
  totals: {
    total: number;
  };
};

export default function TotalFooter({ totals }: TotalFooterProps) {
  const fromatedPrice = new Intl.NumberFormat("es-CO").format(totals.total);

  return (
    <div className={style.principalContainer}>
      <h3 className={style.principalContainer_h3}>
        Total:{" "}
        <span className={style.principalContainer_span_red}>
          {fromatedPrice}
        </span>{" "}
      </h3>
    </div>
  );
}
