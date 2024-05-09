import style from "../styles/Sales.module.css";
import SeachBar from "../../searchBar/components/SearchBar";
import Cards from "./Cards";

export default function Sales() {
  return (
    <div className={style.principalContainer}>
      <div className={style.searchContainer}>
        <div className={style.headContainer}>
          <SeachBar></SeachBar>
          <button>Agregar Producto</button>
        </div>
        <Cards />
      </div>
      <div className={style.saleContainer}></div>
    </div>
  );
}
