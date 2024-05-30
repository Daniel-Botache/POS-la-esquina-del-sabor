import style from "../styles/Table.module.css";
import CellStock from "./CellStock";
import { useCustomSelector } from "../../../store/hooks";

export default function Table() {
  const products = useCustomSelector(
    (state) => state.search.searchProductByName
  );
  return (
    <div className={style.principalContainer}>
      <div>
        {products.map((product: any) => (
          <CellStock
            key={product.id}
            id={product.id}
            name={product.name}
            barCode={product.barCode}
            volume={product.volume}
            maximum={product.maximum}
            createdAt={product.createdAt}
            updatedAt={product.updatedAt}
            price={product.price}
            img={product.img}
            supliers={product.supliers}
            lastVolumeDate={product.lastVolumeDate}
          />
        ))}
      </div>
    </div>
  );
}
