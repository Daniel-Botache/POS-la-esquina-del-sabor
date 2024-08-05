import style from "../styles/MovementHistoryCell.module.css";
import { useState } from "react";
import { DetailIcon } from "../../../utils/Icons/icons";

type MovementHistoryCellProps = {
  id: number;
  movementType: string;
  createdAt: string;
  total: number;
};

export default function MovementHistoryCell({
  id,
  movementType,
  createdAt,
  total,
}: MovementHistoryCellProps) {
  const [isModalDetailSaleOpen, setIsModalDetailOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalDetailOpen(!isModalDetailSaleOpen);
  };

  return (
    <div className={style.principalContainer}>
      <div className={style.prepertyContainer}>{id}</div>
      <div className={style.prepertyContainer}>{movementType}</div>
      <div className={style.prepertyContainer}>{"createdAt"}</div>
      <div className={style.prepertyContainer}>{total}</div>
      <div className={style.prepertyContainer_options}>
        <button
          className={style.prepertyContainer__btn}
          onClick={handleModalOpen}
        >
          <DetailIcon className={style.prepertyContainer__detailIcon} />
        </button>
      </div>
    </div>
  );
}
