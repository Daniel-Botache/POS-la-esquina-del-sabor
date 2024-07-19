import style from "../styles/FooterBalance.module.css";
import Graph from "../../graph/components/Graph";
import { useState } from "react";

interface IndexArrayData {
  time: string;
  value: number;
}

type TotalFooterProps = {
  totals: {
    totalBalance: number;
    totalCash: number;
    totalPercentage: number;
    grahpArrayData: IndexArrayData[];
  };
};

export default function FooterBalance({ totals }: TotalFooterProps) {
  const [graphOpen, setGraphOpen] = useState(false);

  const fromatedTotalBalance = new Intl.NumberFormat("es-CO").format(
    totals.totalBalance
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
        Balance Total:{" "}
        <span className={style.principalContainer_span}>
          {fromatedTotalBalance}
        </span>{" "}
      </h3>
      <h3 className={style.principalContainer_h3}>
        Porcentaje de ganancia:{" "}
        <span className={style.principalContainer_span}>
          {totals.totalPercentage} %
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
