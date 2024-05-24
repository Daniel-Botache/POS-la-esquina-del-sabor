import style from "../../styles/CellList.module.css";
import { useState } from "react";

export default function CellList(props: any) {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    setIsSelected(!isSelected);
    if (!isSelected) {
      props.onDelete(props.id);
    }
  };

  return (
    <div
      className={
        !isSelected
          ? style.principalContainer
          : style.principalContainerSelected
      }
      onDoubleClick={handleSelect}
    >
      <input type="checkbox" checked={isSelected} onChange={handleSelect} />
      <div className={style.principalContainer__text}>{props.barCode}</div>
      <div className={style.principalContainer__text}>{props.productName}</div>
      <div className={style.principalContainer__text}>
        {new Intl.NumberFormat("es-CO").format(props.price)}
      </div>
      <div className={style.principalContainer__text}>{props.quantity}</div>
      <div className={style.principalContainer__text}>
        {new Intl.NumberFormat("es-CO").format(props.total)}
      </div>
    </div>
  );
}
