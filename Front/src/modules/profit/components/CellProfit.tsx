import style from "../styles/CellProfit.module.css";
import { DetailIcon } from "../../../utils/Icons/icons";

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
  return (
    <div className={style.principalContainer}>
      <div className={style.prepertyContainer}>{id}</div>
      <div className={style.prepertyContainer}>{clientId}</div>
      <div className={style.prepertyContainer}>{movementType}</div>
      <div className={style.prepertyContainer}>{paymentType}</div>
      <div className={style.prepertyContainer}>{"createdAt"}</div>
      <div className={style.prepertyContainer}>{valueCash}</div>
      <div className={style.prepertyContainer}>{valueTransaction}</div>
      <div className={style.prepertyContainer}>{total}</div>
      <div className={style.prepertyContainer_options}>
        <button className={style.prepertyContainer__btn}>
          <DetailIcon className={style.prepertyContainer__detailIcon} />
        </button>
      </div>
    </div>
  );
}
