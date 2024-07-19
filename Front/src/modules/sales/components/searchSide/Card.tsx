import style from "../../styles/Card.module.css";
import { FavoriteIcon } from "../../../../utils/Icons/icons";
import { useCustomDispatch } from "../../../../store/hooks";
import { addProductBill, addProductCreateBale } from "../../redux/billSlice";

export default function Card(props: any) {
  const dispatch = useCustomDispatch();

  const handleAddItem = () => {
    if (props.isModal && !props.bale) {
      dispatch(
        addProductCreateBale({
          id: props.id,
          name: props.name,
          barCode: props.barCode,
          bale: props.bale,
        })
      );
      props.onClose();
      return;
    } else if (props.isModal && props.bale) {
      alert("No puede agregar una paca sobre una paca, escoja otro producto.");
      return;
    }
    let quantityPrompt = prompt("Cantidad");
    if (quantityPrompt === null) {
      return;
    }
    let quantityPrompts = Number(quantityPrompt);
    if (isNaN(quantityPrompts)) {
      alert("Solo se aceptan valores numericos");
      return;
    }
    if (quantityPrompts == 0) {
      quantityPrompts = 1;
    }

    dispatch(addProductBill({ product: props, quantity: quantityPrompts }));
  };
  return (
    <div className={style.principalContainer}>
      <FavoriteIcon className={style.headContainer__icon} />
      <div onClick={handleAddItem} className={style.principalContainer_item}>
        <div className={style.headContainer}>
          <h3 className={style.headContainer__h3}> Id: {props.id} </h3>
          <h3 className={style.headContainer__h3}>{props.barCode}</h3>
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
        <h2 className={style.principalContainer__h2}>
          $ {new Intl.NumberFormat("es-CO").format(props.price)}
        </h2>
      </div>
    </div>
  );
}
