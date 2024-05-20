import style from "../styles/CreateProductModal.module.css";
import { useState, useEffect } from "react";
import { useCustomSelector, useCustomDispatch } from "../../../store/hooks";
import { getSuppliers } from "../redux/createProductSlice";
import { SearchIcon } from "../../../utils/Icons/icons";
import SearchSide from "../../sales/components/searchSide/SearchSide";
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
  const [isSearchModalopen, setIsSearchModalopen] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí va la lógica que deseas ejecutar cuando se envía el formulario
  };
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };
  const handleProductTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedSuppliers(selectedOptions);
  };
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
              <input type="checkbox" name="" id="inputSpent" />
            </div>
            <div>
              <label htmlFor="individualRadio">
                Individual
                <input
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
                    type="text"
                    id="inputIndividualId"
                    className={style.form__inputText}
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
