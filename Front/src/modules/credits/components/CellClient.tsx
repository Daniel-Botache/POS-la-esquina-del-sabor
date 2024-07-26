import style from "../styles/CellClient.module.css";
import { Client } from "../redux/clientSlice";
import { useState } from "react";
import { DeleteIcon, EditIcon, DetailIcon } from "../../../utils/Icons/icons";

type ClientProps = Client & {
  onCheckboxChange: (client: { id: string }) => void;
};

export default function CellCLient({
  id,
  name,
  tel,
  address,
  ban,
  quotaMax,
  clientType,
  remainingCuota,
  lastPayment,
  createdAt,
  onCheckboxChange,
}: ClientProps) {
  const [colorBackground, setColorBackground] = useState("");

  const handleCheckboxChange = () => {
    onCheckboxChange({ id: id.toString() });
  };
  return (
    <div className={style.principalContainer}>
      <div className={style.prepertyContainer__check}>
        <input type="checkbox" name="" id="" onChange={handleCheckboxChange} />
      </div>
      <div className={style.prepertyContainer}>{id}</div>
      <div className={style.prepertyContainer}>{name}</div>
      <div className={style.prepertyContainer}>{"----"}</div>
      <div className={style.prepertyContainer}>{lastPayment}</div>
      <div className={`${style.prepertyContainer} ${colorBackground}`}>
        {"dias de mora"}
      </div>
      <div className={style.prepertyContainer}>{remainingCuota}</div>
      <div className={style.prepertyContainer}>{"total credito"}</div>

      <div className={style.prepertyContainer_options}>
        <button className={style.prepertyContainer__btn}>
          <DeleteIcon className={style.prepertyContainer__deleteIcon} />
        </button>
        <button className={style.prepertyContainer__btn}>
          <EditIcon className={style.prepertyContainer__editIcon} />
        </button>
        <button className={style.prepertyContainer__btn}>
          <DetailIcon className={style.prepertyContainer__editIcon} />
        </button>
      </div>
      {/*   {isModalOpen && (
        <EditProductModal id={id} bale={bale} onClose={handleOpenModal} />
      )} */}
    </div>
  );
}
