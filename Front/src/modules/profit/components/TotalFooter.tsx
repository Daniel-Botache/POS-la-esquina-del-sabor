import style from "../styles/TotalFooter.module.css";
import Graph from "../../graph/components/Graph";
import { useState } from "react";

interface IndexArrayData {
  time: string;
  value: number;
}

type TotalFooterProps = {
  totals: {
    total: number;
    totalSpent: number;
    totalCash: number;
    totalTrans: number;
    grahpArrayData: IndexArrayData[];
  };
};

export default function TotalFooter({ totals }: TotalFooterProps) {
  const [graphOpen, setGraphOpen] = useState(false);

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

  const openGraphHandle = () => {
    setGraphOpen(!graphOpen);
  };

  const onClose = () => {
    setGraphOpen(!graphOpen);
  };

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
      <button
        className={style.principalContainer__btn}
        onClick={openGraphHandle}
      >
        Mostrar Gráfico
      </button>
      {graphOpen ? (
        <Graph data={totals.grahpArrayData} onClose={onClose} />
      ) : null}
    </div>
  );
}
