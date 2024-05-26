import style from "../styles/Stock.module.css";
import SeachBar from "../../searchBar/components/SearchBar";
import { DeleteIcon, AddIcon } from "../../../utils/Icons/icons";

export default function Stock() {
  return (
    <div className={style.principalContainer}>
      <div className={style.searchBarContainer}>
        <SeachBar />
        <div className={style.orderContainer}>
          <div className={style.headContainer__button}>
            <p className={style.headContainer__button__p}>Eliminar selección</p>
            <DeleteIcon className={style.headContainer__button__icon} />
          </div>
          <div className={style.headContainer__button}>
            <p className={style.headContainer__button__p}>Crear Producto</p>
            <AddIcon className={style.headContainer__button__icon} />
          </div>
          <div className={style.headContainer__button}>
            <p className={style.headContainer__button__p}>Crear Proveedor</p>
            <AddIcon className={style.headContainer__button__icon} />
          </div>
          <div className={style.filterContainer}></div>
        </div>
      </div>
    </div>
  );
}
