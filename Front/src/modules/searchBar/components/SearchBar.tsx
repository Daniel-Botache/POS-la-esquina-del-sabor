import style from "../styles/SearchBar.module.css";
import { searchProduct } from "../services/searchProductService";
import {
  searchAllProducts,
  searchAllBale,
} from "../services/searchAllProductsService";
import {
  getProductByName,
  getProductByBarNameCopy,
} from "../redux/searchSlice";
import { useCustomDispatch, useCustomSelector } from "../../../store/hooks";
import { SearchIcon } from "../../../utils/Icons/icons";
import { useState, useEffect } from "react";
import { errorMessage } from "../../auth/hooks/notifications";
import { getProductByIdService } from "../../Inventory/services/getProductByIdService";

export default function SeachBar() {
  const [productName, setProductName] = useState("");
  const dispatch = useCustomDispatch();
  const deleted = useCustomSelector((state) => state.stock.deleted);

  useEffect(() => {
    searchByNameHandle();
  }, [deleted, productName]);

  const searchByNameHandle = async () => {
    if (!productName) {
      const responseBales = await searchAllBale();
      if (responseBales.length > 0) {
        for (let i = 0; i < responseBales.length; i++) {
          try {
            const individualProduct = await getProductByIdService(
              responseBales[i].productId
            );
            const arraySuppliersFromIndividual = individualProduct.supliers;
            responseBales[i].supliers = arraySuppliersFromIndividual;
            const arrayTypeProductFromIndividual = individualProduct.typeId;
            const percentageVolume =
              100 / (responseBales[i].maximum / responseBales[i].volume);
            responseBales[i].percentage = percentageVolume;
            responseBales[i].typeId = arrayTypeProductFromIndividual;
          } catch (error) {
            console.log(error);
          }
        }
      }

      const responseProducts = await searchAllProducts();
      if (responseProducts) {
        if (responseProducts.length > 0) {
          for (let i = 0; i < responseProducts.length; i++) {
            const percentageVolume =
              100 / (responseProducts[i].maximum / responseProducts[i].volume);
            responseProducts[i].percentage = percentageVolume;
          }
        }
      }
      const responseAll = responseBales.concat(responseProducts);
      if (responseAll) {
        dispatch(getProductByName({ searchProductByName: responseAll }));
        dispatch(
          getProductByBarNameCopy({ searchProductByNameCopy: responseAll })
        );
        return;
      }
    }
    const responseProduct = await searchProduct(productName, "product");
    if (responseProduct) {
      if (responseProduct.length > 0) {
        for (let i = 0; i < responseProduct.length; i++) {
          const percentageVolume =
            100 / (responseProduct[i].maximum / responseProduct[i].volume);
          responseProduct[i].percentage = percentageVolume;
        }
      }
    }
    const responseBale = await searchProduct(productName, "bale");
    if (responseBale) {
      if (responseBale.length > 0) {
        for (let i = 0; i < responseBale.length; i++) {
          try {
            const individualProduct = await getProductByIdService(
              responseBale[i].productId
            );
            const arraySuppliersFromIndividual = individualProduct.supliers;
            const arrayTypeProductFromIndividual = individualProduct.typeId;
            responseBale[i].typeId = arrayTypeProductFromIndividual;
            responseBale[i].supliers = arraySuppliersFromIndividual;
            const percentageVolume =
              100 / (responseBale[i].maximum / responseBale[i].volume);
            responseBale[i].percentage = percentageVolume;
          } catch (error) {
            console.log(error);
          }
        }
      }
    }

    if (responseProduct && responseBale) {
      const response = responseProduct.concat(responseBale);
      if (response) {
        dispatch(getProductByName({ searchProductByName: response }));
        dispatch(
          getProductByBarNameCopy({ searchProductByNameCopy: response })
        );
        return;
      }
    }
    if (responseProduct && !responseBale) {
      dispatch(getProductByName({ searchProductByName: responseProduct }));
      dispatch(
        getProductByBarNameCopy({ searchProductByNameCopy: responseProduct })
      );
      return;
    }
    if (!responseProduct && responseBale) {
      dispatch(getProductByName({ searchProductByName: responseBale }));
      dispatch(
        getProductByBarNameCopy({ searchProductByNameCopy: responseBale })
      );
      return;
    }
    errorMessage("Datos no encontrados");
  };

  const handleInputEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchByNameHandle();
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
