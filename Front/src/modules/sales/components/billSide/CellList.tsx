import style from "../../styles/CellList.module.css";

export default function CellList(props: any) {
  return (
    <div className={style.principalContainer}>
      <input type="checkbox" />
      <div className={style.principalContainer__text}>{props.barCode}</div>
      <div className={style.principalContainer__text}>{props.productName}</div>
      <div className={style.principalContainer__text}>{props.price}</div>
      <div className={style.principalContainer__text}>{props.quantity}</div>
      <div className={style.principalContainer__text}>{props.total}</div>
    </div>
  );
}
