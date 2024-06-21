import style from "../styles/CellProfit.module.css";
import { DetailIcon } from "../../../utils/Icons/icons";
import { useState } from "react";
import ProfitDetail from "./ProfitDetail";

type CellProfitProps = {
  id: number;
  paymentType: string;
  movementType: string;
  clientId: string;
  createdAt: Date;
  valueTransaction: number;
  valueCash: number;
  total: number;
  products: [];
  bales: [];
};

export default function CellProfit({
  id,
  paymentType,
  movementType,
  clientId,
  createdAt,
  valueTransaction,
  valueCash,
  total,
  products,
  bales,
}: CellProfitProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  const formattedDateCreate = new Date(createdAt).toLocaleDateString();
  return (
    <div className={style.principalContainer}>
      <div className={style.prepertyContainer}>{id}</div>
      <div className={style.prepertyContainer}>{clientId}</div>
      <div className={style.prepertyContainer}>{movementType}</div>
      <div className={style.prepertyContainer}>{paymentType}</div>
      <div className={style.prepertyContainer}>{formattedDateCreate}</div>
      <div className={style.prepertyContainer}>{valueCash}</div>
      <div className={style.prepertyContainer}>{valueTransaction}</div>
      <div className={style.prepertyContainer}>{total}</div>
      <div className={style.prepertyContainer_options}>
        <button
          className={style.prepertyContainer__btn}
          onClick={handleModalOpen}
        >
          <DetailIcon className={style.prepertyContainer__detailIcon} />
        </button>
        {modalOpen && (
          <ProfitDetail
            id={id}
            clientId={clientId}
            total={total}
            products={products}
            bales={bales}
            movementType={movementType}
            createdAt={createdAt}
            closeModal={handleModalOpen}
          />
        )}
      </div>
    </div>
  );
}
