import style from "../styles/SearchBar.module.css";
import { searchProduct } from "../services/searchProdcutService";
import { searchAllProducts } from "../services/searchAllProductsService";
import { getProductByName, getProductByBar } from "../redux/searchSlice";
import { useCustomDispatch } from "../../../store/hooks";

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
    if (response && Array.isArray(response)) {
      dispatch(getProductByName({ searchProductByName: response }));
      return;
    }
    if (response && typeof response === "object") {
      dispatch(getProductByBar({ searchProductByBar: response }));
      return;
    }
  };
  return (
    <div className={style.principalContainer}>
      <input
        type="text"
        placeholder="Buscar Producto"
        onChange={(e) => setProductName(e.target.value)}
      />
      <button onClick={searchByNameHandle}>Buscar</button>
    </div>
  );
}
