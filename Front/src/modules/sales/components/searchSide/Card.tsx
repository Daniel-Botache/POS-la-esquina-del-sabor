import style from "../../styles/Card.module.css";
import { FavoriteIcon } from "../../../../utils/Icons/icons";
import { useCustomDispatch } from "../../../../store/hooks";
import { addProductBill } from "../../redux/billSlice";

export default function Card(props: any) {
  const dispatch = useCustomDispatch();
  const handleAddItem = () => {
    dispatch(addProductBill({ product: props, quantity: 1 }));
  };
  return (
    <div className={style.principalContainer} onClick={handleAddItem}>
      <div className={style.headContainer}>
        <h3 className={style.headContainer__h3}> Id: {props.id} </h3>
        <h3 className={style.headContainer__h3}>{props.barCode}</h3>
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
