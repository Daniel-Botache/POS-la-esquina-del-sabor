import style from "../styles/SearchBar.module.css";

export default function SeachBar() {
  return (
    <div className={style.principalContainer}>
      <input type="text" placeholder="Buscar Producto" />
      <button>Buscar</button>
    </div>
  );
}
