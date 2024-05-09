import Cards from "./Cards";
import SeachBar from "../../../searchBar/components/SearchBar";
import style from "../../styles/SearchSide.module.css";
import { AddIcon } from "../../../../utils/Icons/icons";

export default function SearchSide() {
  return (
    <div className={style.principalContainer}>
      <div className={style.headContainer}>
        <SeachBar></SeachBar>
        <div className={style.headContainer__button}>
          <p className={style.headContainer__button__p}>Crear Producto</p>
          <AddIcon className={style.headContainer__button__icon} />
        </div>
      </div>
      <Cards />
    </div>
  );
}
