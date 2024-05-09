import Cards from "./Cards";
import SeachBar from "../../../searchBar/components/SearchBar";
import style from "../../styles/SearchSide.module.css";

export default function SearchSide() {
  return (
    <div className={style.principalContainer}>
      <div className={style.headContainer}>
        <SeachBar></SeachBar>
        <button>Agregar Producto</button>
      </div>
      <Cards />
    </div>
  );
}
