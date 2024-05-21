import style from "../../styles/CellList.module.css";
import { useState } from "react";

export default function CellList(props: any) {
  const [isSelected, setIsSelected] = useState(false);

  const handleSelect = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      className={
        !isSelected
          ? style.principalContainer
          : style.principalContainerSelected
      }
      onClick={handleSelect}
    >
      <input type="checkbox" checked={isSelected} />
      <div className={style.principalContainer__text}>{props.barCode}</div>
      <div className={style.principalContainer__text}>{props.productName}</div>
      <div className={style.principalContainer__text}>{props.price}</div>
      <div className={style.principalContainer__text}>{props.quantity}</div>
      <div className={style.principalContainer__text}>{props.total}</div>
    </div>
  );
}
