import style from "../styles/CellStock.module.css";

type product = {
  id: number;
  name: string;
  supliers: string[];
  volume: number;
  maximum: number;
  createdAt: string;
  updatedAt: string;
  barCode: string;
  price: number;
  img: string;
  lastVolumeDate: string;
};

export default function CellStock({
  id,
  name,
  supliers,
  volume,
  maximum,
  createdAt,
  barCode,
  price,
  img,
  lastVolumeDate,
}: product) {
  return (
    <div className={style.principalContainer}>
      <div className={style.prepertyContainer}>{id}</div>
      <div className={style.prepertyContainer}>{barCode}</div>
      <div className={style.prepertyContainer}>{name}</div>
      <div className={style.prepertyContainer}>{supliers}</div>
      <div className={style.prepertyContainer}>{volume}</div>
      <div className={style.prepertyContainer}>{maximum}</div>
      <div className={style.prepertyContainer}>{createdAt}</div>
      <div className={style.prepertyContainer}>{lastVolumeDate}</div>
      <div className={style.prepertyContainer}>{price}</div>
      <div className={style.prepertyContainer}></div>
    </div>
  );
}
