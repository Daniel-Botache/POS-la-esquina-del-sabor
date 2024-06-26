import style from "../../styles/Cards.module.css";
import Card from "./Card";
import { useCustomSelector } from "../../../../store/hooks";

type searchProductType = {
  isModal: boolean;
  onClose: () => void;
};
export default function Cards({ isModal, onClose }: searchProductType) {
  const productSearched = useCustomSelector(
    (state) => state.search.searchProductByName
  );
  return (
    <div className={style.principalContainer}>
      <div className={style.container}>
        {productSearched.map((product: any) => (
          <Card
            spent={product.spent}
            onClose={onClose}
            isModal={isModal}
            barCode={product.barCode}
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            volume={product.volume}
            img={product.img}
            bale={product.bale}
            productId={product.productId}
            individualQuanty={product.individualQuanty}
          />
        ))}
      </div>
    </div>
  );
}
