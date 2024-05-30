import style from "../styles/CellStock.module.css";
import { EditIcon, DeleteIcon } from "../../../utils/Icons/icons";
import { deleteProductService } from "../services/deleteProductService";

type Suplier = {
  id: string;
  company: string;
  tel: string;
  adviser: string;
  createdAt: Date;
  updatedAt: Date;
};

type product = {
  id: number;
  name: string;
  supliers: Suplier[];
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
  const arrayStringSuppliers = supliers
    ? supliers.map((suplier: Suplier) => suplier.company).join(", ")
    : "";

  const formattedDateCreate = new Date(createdAt).toLocaleDateString();
  const formattedDateLast = new Date(lastVolumeDate).toLocaleDateString();

  const handleDeleteProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const userConfirm = confirm(
      `¿Seguro desea eliminar el producto con id ${id}?`
    );
    if (userConfirm) {
      deleteProductService(id);
      window.location.reload();
      return;
    }
  };
  return (
    <div className={style.principalContainer}>
      <div className={style.prepertyContainer__check}>
        <input type="checkbox" name="" id="" />
      </div>
      <div className={style.prepertyContainer}>{id}</div>
      <div className={style.prepertyContainer}>{barCode}</div>
      <div className={style.prepertyContainer}>{name}</div>
      <div className={style.prepertyContainer}>{arrayStringSuppliers}</div>
      <div className={style.prepertyContainer}>{volume}</div>
      <div className={style.prepertyContainer}>{maximum}</div>
      <div className={style.prepertyContainer}>{formattedDateCreate}</div>
      <div className={style.prepertyContainer}>{formattedDateLast}</div>
      <div className={style.prepertyContainer}>{price}</div>
      <div className={style.prepertyContainer_options}>
        <button
          className={style.prepertyContainer__btn}
          onClick={handleDeleteProduct}
        >
          <DeleteIcon className={style.prepertyContainer__deleteIcon} />
        </button>
        <button className={style.prepertyContainer__btn}>
          <EditIcon className={style.prepertyContainer__editIcon} />
        </button>
      </div>
    </div>
  );
}
