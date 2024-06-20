import style from "../styles/ProfitDetail.module.css";

type ProfitDetailProps = {
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

export default function ProfitDetail({
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
}: ProfitDetailProps) {
  return (
    <div className={style.principalContainer}>
      <div className={style.titleContainer}>
        <h1 className={style.titleContainer__h1}>Factura: {id}</h1>
        <div className={style.clientContainer}>
          <h4 className={style.principalContainer__h4}>Cliente: {clientId}</h4>
        </div>
      </div>
    </div>
  );
}
