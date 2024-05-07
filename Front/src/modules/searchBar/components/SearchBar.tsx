import style from "../styles/SearchBar.module.css";
import { searchProductByName } from "../services/searchProductService";
import { getPorductByName } from "../redux/searchSlice";
import { useCustomDispatch } from "../../../store/hooks";
import { useCustomSelector } from "../../../store/hooks";
import { useState } from "react";

export default function SeachBar() {
  const [productName, setProductName] = useState("");
  const dispatch = useCustomDispatch();

  const searchByNameHandle = async () => {
    if (!productName) {
      console.log("no ha ingresado datos");
    }
    const response = await searchProductByName(productName);
    console.log(response);
    dispatch(getPorductByName({ searchProductByName: response }));
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
