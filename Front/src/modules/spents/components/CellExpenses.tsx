import style from "../styles/CellExpenses.module.css";

type CellExpenseProps = {
  id: number;
  type: string;
  suplierId: string;
  description: string;
  createdAt: Date;
  total: number;
  userId: string;
};

export default function CellExpenses({
  id,
  type,
  suplierId,
  description,
  createdAt,
  total,
  userId,
}: CellExpenseProps) {
  const fromatedPrice = new Intl.NumberFormat("es-CO").format(total);
  const formattedDateCreate = new Date(createdAt).toLocaleDateString();

  return (
    <div className={style.principalContainer}>
      <div className={style.prepertyContainer}>{id}</div>
      <div className={style.prepertyContainer}>{description}</div>
      <div className={style.prepertyContainer}>{suplierId}</div>
      <div className={style.prepertyContainer}>{type}</div>
      <div className={style.prepertyContainer}>{formattedDateCreate}</div>
      <div className={style.prepertyContainer}>{fromatedPrice}</div>
      <div className={style.prepertyContainer}>{userId}</div>
    </div>
  );
}
