import style from "../../styles/Card.module.css";
import { FavoriteIcon } from "../../../../utils/Icons/icons";

export default function Card(props: any) {
  return (
    <div className={style.principalContainer}>
      <div className={style.headContainer}>
        <h3 className={style.headContainer__h3}> Cod: {props.id} </h3>
        <FavoriteIcon className={style.headContainer__icon} />
      </div>

      <div className={style.imgContainer}>
        <img
          src={props.img}
          alt="producto"
          className={style.imgContainer__img}
        />
      </div>
      <p className={style.principalContainer__p}>Inv: {props.volume}</p>
      <h2 className={style.principalContainer__h2}>{props.name}</h2>
      <h2 className={style.principalContainer__h2}>$ {props.price}</h2>
    </div>
  );
}
