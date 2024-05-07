import style from "../styles/Sales.module.css";
import SeachBar from "../../searchBar/components/SearchBar";

export default function Sales() {
  return (
    <div className={style.principalContainer}>
      <div className={style.searchContainer}>
        <SeachBar></SeachBar>
      </div>
      <div className={style.saleContainer}></div>
    </div>
  );
}
