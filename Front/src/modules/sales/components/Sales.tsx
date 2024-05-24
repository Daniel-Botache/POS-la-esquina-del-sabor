import style from "../styles/Sales.module.css";
import SearchSide from "./searchSide/SearchSide";
import BillSide from "./billSide/BillSide";
export default function Sales() {
  return (
    <div className={style.principalContainer}>
      <SearchSide isModal = {false} onClose={false}  />
      <BillSide />
    </div>
  );
}
