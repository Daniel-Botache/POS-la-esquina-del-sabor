import style from "../styles/CreateProductModal.module.css";
import { useState, useEffect, useRef } from "react";
import { useCustomSelector, useCustomDispatch } from "../../../store/hooks";
import { getSuppliers, getTypes } from "../redux/createProductSlice";
import { SearchIcon, AddIcon } from "../../../utils/Icons/icons";
import SearchSide from "../../sales/components/searchSide/SearchSide";
import { Product } from "../services/postNewProduct";
import { postNewProduct } from "../services/postNewProduct";
import { clearProductSearched } from "../../sales/redux/billSlice";
import { errorMessage } from "../../auth/hooks/notifications";
import CreateTypeModal from "./CreateTypeModal";
import Select from "react-select";
import { changeDeleteStatus } from "../../Inventory/redux/stockSlice";
type CreateProductModalProps = {
  onClose: () => void;
};

export default function CreateProductModal({
  onClose,
}: CreateProductModalProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [suppliersOptions, setSuppliersOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const dispatch = useCustomDispatch();
  const suppliers = useCustomSelector((state) => state.createProduct.suppliers);
  const types = useCustomSelector((state) => state.createProduct.types);
  const [productType, setProductType] = useState("individual");
  const [isSearchModalopen, setIsSearchModalopen] = useState(true);
  const [isCreateTypeModalOpen, setIsCreateTypeModalOpen] = useState(true);
  const [selectedSuppliers, setSelectedSuppliers] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: null,
    name: "",
    typeId: "",
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
    lastVolumeDate: null,
  });

  const individualProductId = useCustomSelector(
    (state) => state.bill.productSearched
  );

  const handleInputEnterBarCode = (
    e: React.KeyboardEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    if (e.key === "Enter") {
      const nextIndex = currentIndex + 1;
      const nextInput = inputRefs.current[nextIndex];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !newProduct.name ||
      !newProduct.volume ||
      !newProduct.maximum ||
      !newProduct.price
    ) {
      errorMessage(
        "Para crear un producto debe llenar los campos marcados con el *"
      );
      return;
    }
    if (newProduct.bale == null) {
      setNewProduct((prevState) => ({
        ...prevState,
        productId: null,
        individualQuanty: null,
      }));
      await postNewProduct(newProduct, "product");
      dispatch(clearProductSearched());
      dispatch(changeDeleteStatus());
      setSelectedSuppliers([]);
      setNewProduct((prevState) => ({
        ...prevState,
        id: null,
        name: "",
        typeId: "",
        volume: 0,
        maximum: 0,
        barCode: "",
        price: 0,
        spent: false,
        productId: null,
        individualQuanty: null,
        img: undefined,
        supliers: null,
      }));
      return;
    }

    await postNewProduct(newProduct, "bale");
    dispatch(clearProductSearched());
    dispatch(changeDeleteStatus());
    setSelectedSuppliers([]);
    setNewProduct((prevState) => ({
      ...prevState,
      id: null,
      name: "",
      typeId: "",
      volume: 0,
      maximum: 0,
      barCode: "",
      price: 0,
      spent: false,
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
      typeId: event.target.value == "paca" ? null : prevState.typeId,
    }));

    setProductType(event.target.value);
  };

  const handleOpenSearchModal = () => {
    setIsSearchModalopen(!isSearchModalopen);
  };
  const handleButtonClickSearchModal = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    handleOpenSearchModal();
  };

  const handleButtonClickCreateType = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    handleOpenCreateTypeModal();
  };

  const handleOpenCreateTypeModal = () => {
    setIsCreateTypeModalOpen(!isCreateTypeModalOpen);
  };

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getSuppliers());
    const options = suppliers.map((supplier) => ({
      value: supplier.id,
      label: supplier.company,
    }));
    setSuppliersOptions(options);
  }, [isCreateTypeModalOpen]);

  const handleTypeSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (newProduct.bale) {
      setNewProduct((prevState) => ({
        ...prevState,
        typeId: null,
      }));
      return;
    }
    setNewProduct((prevState) => ({
      ...prevState,
      typeId: event.target.value,
    }));
  };

  const handleSupplierSelection = (options: any) => {
    setSelectedSuppliers(options);

    if (newProduct.bale) {
      setNewProduct((prevState) => ({
        ...prevState,
        supliers: null,
      }));
      return;
    }
    const selectedOptions = options.map((option: any) => option.value);
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

        <form
          onSubmit={handleSubmit}
          className={style.formContainer}
          onKeyDown={(e) => {
            if (e.key == "Enter") e.preventDefault();
          }}
        >
          <h2 className={style.formContainer__h2}>Crear Producto</h2>

          <div className={style.inputContainer}>
            {" "}
            <label htmlFor="inputBarCode" className={style.form__label}>
              Cod. Barras
            </label>
            <input
              ref={(el) => (inputRefs.current[0] = el)}
              onKeyDown={(e) => handleInputEnterBarCode(e, 0)}
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
              Nombre *
            </label>
            <input
              ref={(el) => (inputRefs.current[1] = el)}
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
              Precio *
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
              Cantidad *
            </label>
            <input
              onChange={(e) =>
                setNewProduct((prevState) => ({
                  ...prevState,
                  volume: parseFloat(e.target.value),
                }))
              }
              type="text"
              id="inputVolume"
              className={style.form__inputText}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="inputMaximum" className={style.form__label}>
              Tope *
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
              Clasificación *
            </label>
            <div className={style.clasificationContainer}>
              <select
                className={`${style.form__select} ${style.form__select_clas}`}
                value={newProduct.typeId ? newProduct.typeId : ""}
                name="inputType"
                id="inputType"
                onChange={handleTypeSelection}
              >
                <option value="">Seleccionar tipo</option>
                {types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className={style.principalContainer__btn}
                onClick={handleButtonClickCreateType}
              >
                <AddIcon className={style.principalContainer__icon} />
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
              maxLength={Infinity}
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
                    onClick={handleButtonClickSearchModal}
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
          <Select
            isDisabled={newProduct.bale ? true : false}
            className={style.form__select}
            options={suppliersOptions}
            isMulti
            onChange={handleSupplierSelection}
            value={selectedSuppliers}
          />

          <button type="submit" className={style.formContainer__btn}>
            Crear producto
          </button>
          {!isSearchModalopen && (
            <SearchSide onClose={handleOpenSearchModal} isModal={true} />
          )}
        </form>
        {!isCreateTypeModalOpen && (
          <CreateTypeModal onClose={handleOpenCreateTypeModal} />
        )}
      </div>
    </div>
  );
}
