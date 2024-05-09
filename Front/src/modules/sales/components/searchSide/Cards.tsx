import style from "../styles/Cards.module.css";
import Card from "./Card";
import { useCustomSelector } from "../../../../store/hooks";

export default function Cards() {
  const productSearched = useCustomSelector(
    (state) => state.search.searchProductByName
  );
  return (
    <div className={style.principalContainer}>
      <div className={style.container}>
        {productSearched.map((product: any) => (
          <Card
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            volume={product.volume}
            img={product.img}
          />
        ))}
      </div>
    </div>
  );
}
