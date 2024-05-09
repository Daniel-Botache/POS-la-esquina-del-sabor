import style from "../styles/Sales.module.css";
import SeachBar from "../../searchBar/components/SearchBar";

export default function Sales() {
  return (
    <div className={style.principalContainer}>
      <div className={style.searchContainer}>
        <div className={style.headContainer}>
          <SeachBar></SeachBar>
          <button>Agregar Prodcuto</button>
        </div>
      </div>
      <div className={style.saleContainer}></div>
    </div>
  );
}
