import style from "../styles/CreateProductModal.module.css";
import { useState, useEffect } from "react";
import { useCustomSelector, useCustomDispatch } from "../../../store/hooks";
import { getSuppliers } from "../redux/createProductSlice";
import { SearchIcon } from "../../../utils/Icons/icons";
import SearchSide from "../../sales/components/searchSide/SearchSide";
import { Product } from "../services/postNewProduct";
import { postNewProduct } from "../services/postNewProduct";
import { clearProductSearched } from "../../sales/redux/billSlice";
type CreateProductModalProps = {
  onClose: () => void;
};

export default function CreateProductModal({
  onClose,
}: CreateProductModalProps) {
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const dispatch = useCustomDispatch();
  const suppliers = useCustomSelector((state) => state.createProduct.suppliers);
  const [productType, setProductType] = useState("individual");
  const [isSearchModalopen, setIsSearchModalopen] = useState(true);
  const [newProduct, setNewProduct] = useState<Product>({
    id: null,
    name: "",
    type: "",
    volume: null,
    maximum: null,
    barCode: "",
    price: null,
    spent: false,
    bale: null,
    productId: null,
    individualQuanty: null,
    img: undefined,
    supliers: null,
  });
  const [inputValues, setInputValues] = useState({
    inputBarCode: "",
    inputName: "",
    inputPrice: "",
  });

  const individualProductId = useCustomSelector(
    (state) => state.bill.productSearched
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(newProduct);
    if (newProduct.bale == null) {
      setNewProduct((prevState) => ({
        ...prevState,
        productId: null,
        individualQuanty: null,
      }));
      await postNewProduct(newProduct, "product");
      dispatch(clearProductSearched());
      setNewProduct(() => ({
        id: null,
        name: "",
        type: "",
        volume: 0,
        maximum: 0,
        barCode: "",
        price: 0,
        spent: false,
        bale: null,
        productId: null,
        individualQuanty: null,
        img: undefined,
        supliers: null,
      }));
      return;
    }

    await postNewProduct(newProduct, "bale");
    dispatch(clearProductSearched());
    setNewProduct(() => ({
      id: null,
      name: "",
      type: "",
      volume: 0,
      maximum: 0,
      barCode: "",
      price: 0,
      spent: false,
      bale: null,
      productId: null,
      individualQuanty: null,
      img: undefined,
      supliers: null,
    }));
  };
  const handleClose = () => {
    if (onClose) {
      onClose();
      dispatch(clearProductSearched());
    }
  };
  const handleProductTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewProduct((prevState) => ({
      ...prevState,
      bale: event.target.value == "individual" ? null : true,
      supliers: event.target.value == "paca" ? null : [],
    }));

    setProductType(event.target.value);
  };

  const handleOpenSearchModal = () => {
    setIsSearchModalopen(!isSearchModalopen);
  };

  useEffect(() => {
    dispatch(getSuppliers());
  }, [dispatch]);

  const handleSupplierSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (newProduct.bale) {
      setNewProduct((prevState) => ({
        ...prevState,
        supliers: null,
      }));
      return;
    }
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setNewProduct((prevState) => ({
      ...prevState,
      supliers: selectedOptions,
    }));
  };

  useEffect(() => {
    setNewProduct((prevState) => ({
      ...prevState,
      productId: Number(individualProductId.id) || null, // Asegúrate de que individualProductId no sea undefined
    }));
  }, [individualProductId]);

  return (
    <div className={style.modalOverlay}>
      <div className={style.principalContainer}>
        <div className={style.closeButtonContainer}>
          <button className={style.closeButton} onClick={handleClose}>
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} className={style.formContainer}>
          <h2>Crear Producto</h2>

          <div className={style.inputContainer}>
            {" "}
            <label htmlFor="inputBarCode" className={style.form__label}>
              Cod. Barras
            </label>
            <input
              onChange={(e) =>
                setNewProduct((prevState) => ({
                  ...prevState,
                  barCode: e.target.value,
                }))
              }
              value={newProduct.barCode}
              type="text"
              id="inputBarCode"
              className={style.form__inputText}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="inputName" className={style.form__label}>
              Nombre
            </label>
            <input
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
              type="text"
              id="inputName"
              className={style.form__inputText}
            />
          </div>

          <div className={style.inputContainer}>
            <label htmlFor="inputPrice" className={style.form__label}>
              Precio
            </label>
            <input
              value={Number(newProduct.price)}
              onChange={(e) =>
                setNewProduct((prevState) => ({
                  ...prevState,
                  price: Number(e.target.value),
                }))
              }
              type="text"
              id="inputPrice"
              className={style.form__inputText}
            />
          </div>
          <div className={style.inputContainer}>
            {" "}
            <label htmlFor="inputVolume" className={style.form__label}>
              Inventario
            </label>
            <input
              value={Number(newProduct.volume)}
              onChange={(e) =>
                setNewProduct((prevState) => ({
                  ...prevState,
                  volume: Number(e.target.value),
                }))
              }
              type="text"
              id="inputVolume"
              className={style.form__inputText}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="inputMaximum" className={style.form__label}>
              Tope
            </label>
            <input
              value={Number(newProduct.maximum)}
              onChange={(e) =>
                setNewProduct((prevState) => ({
                  ...prevState,
                  maximum: Number(e.target.value),
                }))
              }
              type="text"
              name=""
              id="inputMaximum"
              className={style.form__inputText}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="inputType" className={style.form__label}>
              Clasificación
            </label>
            <div>
              {" "}
              <input
                value={newProduct.type}
                onChange={(e) =>
                  setNewProduct((prevState) => ({
                    ...prevState,
                    type: e.target.value,
                  }))
                }
                type="text"
                id="inputType"
                className={style.form__inputText}
              />
              <button className={style.principalContainer__btn}>
                <SearchIcon className={style.principalContainer__icon} />
              </button>
            </div>
          </div>
          <div className={style.inputContainer}>
            {" "}
            <label htmlFor="inputImg" className={style.form__label}>
              URL Imagen
            </label>
            <input
              value={newProduct.img}
              onChange={(e) =>
                setNewProduct((prevState) => ({
                  ...prevState,
                  img: e.target.value,
                }))
              }
              type="text"
              id="inputImg"
              className={style.form__inputText}
            />
          </div>
          <div className={style.inputContainer}>
            <div>
              <label htmlFor="inputSpent" className={style.form__label}>
                Verdura
              </label>
              <input
                checked={newProduct.spent}
                onChange={(e) =>
                  setNewProduct((prevState) => ({
                    ...prevState,
                    spent: e.target.checked,
                  }))
                }
                type="checkbox"
                name=""
                id="inputSpent"
              />
            </div>
            <div>
              <label htmlFor="individualRadio">
                Individual
                <input
                  defaultChecked
                  type="radio"
                  name="tipo"
                  id="individualRadio"
                  value="individual"
                  onChange={handleProductTypeChange}
                />
              </label>
              <label htmlFor="pacaRadio">
                Paca
                <input
                  type="radio"
                  name="tipo"
                  id="pacaRadio"
                  value="paca"
                  onChange={handleProductTypeChange}
                />
              </label>
            </div>
          </div>
          {productType === "paca" && (
            <div className={style.baleContainer}>
              <div className={style.inputContainer}>
                <label
                  htmlFor="inputIndividualId"
                  className={style.form__label}
                >
                  ID del producto individual
                </label>
                <div className={style.searchContainer}>
                  <input
                    onChange={(e) =>
                      setNewProduct((prevState) => ({
                        ...prevState,
                        productId: Number(e.target.value),
                      }))
                    }
                    value={individualProductId.id}
                    type="text"
                    id="inputIndividualId"
                    className={style.form__inputText}
                    disabled
                  />
                  <button
                    type="button"
                    className={style.principalContainer__btn}
                    onClick={handleOpenSearchModal}
                  >
                    <SearchIcon className={style.principalContainer__icon} />
                  </button>
                </div>
              </div>
              <div className={style.inputContainer}>
                <label
                  htmlFor="inputIndividualQuan"
                  className={style.form__label}
                >
                  Numero de productos individuales
                </label>
                <input
                  value={Number(newProduct.individualQuanty)}
                  onChange={(e) =>
                    setNewProduct((prevState) => ({
                      ...prevState,
                      individualQuanty: Number(e.target.value),
                    }))
                  }
                  type="text"
                  id="inputIndividualQuan"
                  className={style.form__inputText}
                />
              </div>
            </div>
          )}
          <label htmlFor="inputSuppliers" className={style.form__label}>
            Proveedores
          </label>
          <select
            multiple={true}
            id="inputSuppliers"
            value={selectedSuppliers}
            onChange={handleSupplierSelection}
            className={style.form__select}
          >
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.company}
              </option>
            ))}
          </select>
          <button type="submit" className={style.formContainer__btn}>
            Crear producto
          </button>
          {!isSearchModalopen && (
            <SearchSide onClose={handleOpenSearchModal} isModal={true} />
          )}
        </form>
      </div>
    </div>
  );
}
