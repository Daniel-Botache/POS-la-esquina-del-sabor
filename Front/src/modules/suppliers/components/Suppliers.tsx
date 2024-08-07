import style from "../styles/Supliers.module.css";
import SearchBarSupplier from "./SearchBarSupplier";

export default function Suppliers() {
  return (
    <div className={style.principalContainer}>
      <div>
        <SearchBarSupplier />
      </div>
    </div>
  );
}
