import style from "../styles/SearchBarClient.module.css";
import { SearchIcon } from "../../../utils/Icons/icons";

export default function SearchBarClient() {
  return (
    <div className={style.principalContainer}>
      <input
        type="text"
        placeholder="Buscar Cliente"
        className={style.principalContainer__input}
      />
      <button className={style.principalContainer__btn}>
        <SearchIcon className={style.principalContainer__icon} />
      </button>
    </div>
  );
}
