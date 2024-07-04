import style from "../styles/TotalFooterExpenses.module.css";
import { useState } from "react";
import Graph from "../../graph/components/Graph";

interface IndexArrayData {
  time: string;
  value: number;
}

type TotalFooterProps = {
  totals: {
    total: number;
    grahpArrayData: IndexArrayData[];
  };
};

export default function TotalFooterExpenses({ totals }: TotalFooterProps) {
  const [graphOpen, setGraphOpen] = useState(false);
  const fromatedPrice = new Intl.NumberFormat("es-CO").format(totals.total);

  const onClose = () => {
    setGraphOpen(!graphOpen);
  };

  const openGraphHandle = () => {
    setGraphOpen(!graphOpen);
  };
  return (
    <div className={style.principalContainer}>
      <h3 className={style.principalContainer_h3}>
        Total:{" "}
        <span className={style.principalContainer_span_red}>
          {fromatedPrice}
        </span>{" "}
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
