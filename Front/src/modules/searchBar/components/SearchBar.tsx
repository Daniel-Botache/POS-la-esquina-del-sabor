import style from "../styles/SearchBar.module.css";
import { searchProduct } from "../services/searchProductService";
import { searchAllProducts } from "../services/searchAllProductsService";
import { getProductByName } from "../redux/searchSlice";
import { useCustomDispatch } from "../../../store/hooks";
import { SearchIcon } from "../../../utils/Icons/icons";

import { useState } from "react";

export default function SeachBar() {
  const [productName, setProductName] = useState("");
  const dispatch = useCustomDispatch();

  const searchByNameHandle = async () => {
    if (!productName) {
      const response = await searchAllProducts();
      if (response) {
        dispatch(getProductByName({ searchProductByName: response }));
        return;
      }
    }
    const response = await searchProduct(productName);
    console.log(response);
    if (response) {
      dispatch(getProductByName({ searchProductByName: response }));
      return;
    }
  };
  return (
    <div className={style.principalContainer}>
      <input
        type="text"
        placeholder="Buscar Producto"
        onChange={(e) => setProductName(e.target.value)}
        className={style.principalContainer__input}
      />
      <button
        onClick={searchByNameHandle}
        className={style.principalContainer__btn}
      >
        <SearchIcon className={style.principalContainer__icon} />
      </button>
    </div>
  );
}
