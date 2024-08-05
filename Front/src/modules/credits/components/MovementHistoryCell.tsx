import style from "../styles/MovementHistoryCell.module.css";
import { useState } from "react";
import { DetailIcon } from "../../../utils/Icons/icons";
import ProfitDetail from "../../profit/components/ProfitDetail";

type MovementHistoryCellProps = {
  id: number;
  movementType: string;
  createdAt: string;
  total: number;
  clientId: string | null;
  products: [];
  bales: [];
};

export default function MovementHistoryCell({
  id,
  movementType,
  createdAt,
  total,
  clientId,
  products,
  bales,
}: MovementHistoryCellProps) {
  const [isModalDetailSaleOpen, setIsModalDetailOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalDetailOpen(!isModalDetailSaleOpen);
  };

  const formatedTotalDeuHandle = new Intl.NumberFormat("es-CO").format(total);

  return (
    <div className={style.principalContainer}>
      <div className={style.prepertyContainer}>{id}</div>
      <div className={style.prepertyContainer}>{movementType}</div>
      <div className={style.prepertyContainer}>{"createdAt"}</div>
      <div className={style.prepertyContainer}>{formatedTotalDeuHandle}</div>
      <div className={style.prepertyContainer_options}>
        <button
          className={style.prepertyContainer__btn}
          onClick={handleModalOpen}
        >
          <DetailIcon className={style.prepertyContainer__detailIcon} />
        </button>
      </div>
      {isModalDetailSaleOpen && (
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
  );
}
