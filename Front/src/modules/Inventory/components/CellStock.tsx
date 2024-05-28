import style from "../styles/CellStock.module.css";

type product = {
  id: number;
  name: string;
  supliers: string[];
  volume: number;
  maximum: number;
  createdAt: Date;
  updatedAt: Date;
  barCode: string;
  price: number;
  img: string;
};

export default function CellStock({
  id,
  name,
  supliers,
  volume,
  maximum,
  createdAt,
  updatedAt,
  barCode,
  price,
  img,
}: product) {
  return (
    <div className={style.principalContainer}>
      <div className={style.prepertyContainer}>{id}</div>
      <div className={style.prepertyContainer}>{barCode}</div>
      <div className={style.prepertyContainer}>{name}</div>
      <div className={style.prepertyContainer}>{supliers}</div>
      <div className={style.prepertyContainer}>{volume}</div>
      <div className={style.prepertyContainer}>{maximum}</div>
      <div className={style.prepertyContainer}>{"Fecha"}</div>
      <div className={style.prepertyContainer}>{"Fecha"}</div>
      <div className={style.prepertyContainer}>{price}</div>
      <div className={style.prepertyContainer}></div>
    </div>
  );
}
