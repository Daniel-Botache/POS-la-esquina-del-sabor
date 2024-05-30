import style from "../styles/SearchBar.module.css";
import { searchProduct } from "../services/searchProductService";
import {
  searchAllProducts,
  searchAllBale,
} from "../services/searchAllProductsService";
import { getProductByName } from "../redux/searchSlice";
import { useCustomDispatch } from "../../../store/hooks";
import { SearchIcon } from "../../../utils/Icons/icons";
import { useState, useEffect } from "react";
import { errorMessage } from "../../auth/hooks/notifications";

export default function SeachBar() {
  const [productName, setProductName] = useState("");
  const dispatch = useCustomDispatch();

  useEffect(() => {
    searchByNameHandle();
  }, [productName]);

  const searchByNameHandle = async () => {
    if (!productName) {
      const responseBales = await searchAllBale();
      const responseProducts = await searchAllProducts();
      const responseAll = responseBales.concat(responseProducts);
      if (responseAll) {
        dispatch(getProductByName({ searchProductByName: responseAll }));
        return;
      }
    }
    const responseProduct = await searchProduct(productName, "product");
    const responseBale = await searchProduct(productName, "bale");
    if (responseProduct && responseBale) {
      const response = responseProduct.concat(responseBale);
      if (response) {
        dispatch(getProductByName({ searchProductByName: response }));
        return;
      }
    }
    if (responseProduct && !responseBale) {
      dispatch(getProductByName({ searchProductByName: responseProduct }));
      return;
    }
    if (!responseProduct && responseBale) {
      dispatch(getProductByName({ searchProductByName: responseBale }));
      return;
    }
    errorMessage("Datos no encontrados");
  };
  const handleInputEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchByNameHandle();
      setProductName("");
    }
  };
  return (
    <div className={style.principalContainer}>
      <input
        type="text"
        placeholder="Buscar Producto"
        onChange={(e) => setProductName(e.target.value)}
        className={style.principalContainer__input}
        onKeyDown={handleInputEnter}
        value={productName}
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
