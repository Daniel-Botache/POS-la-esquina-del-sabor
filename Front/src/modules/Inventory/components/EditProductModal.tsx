import style from "../styles/EditProductModal.module.css";
import { getProductByIdService } from "../services/getProductByIdService";
import { useEffect, useState } from "react";
import { Product } from "../../createProductModal/services/postNewProduct";
import { useCustomSelector, useCustomDispatch } from "../../../store/hooks";
import { AddIcon, SearchIcon } from "../../../utils/Icons/icons";
import SearchSide from "../../sales/components/searchSide/SearchSide";
import Select from "react-select";
import CreateTypeModal from "../../createProductModal/components/CreateTypeModal";
import {
  getSuppliers,
  getTypes,
} from "../../createProductModal/redux/createProductSlice";

type EditProductModalProps = {
  id: number;
  bale: boolean | null;
  onClose: () => void;
};

export default function EditProductModal({
  id,
  onClose,
}: EditProductModalProps) {
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
  });
  const types = useCustomSelector((state) => state.createProduct.types);
  const [productType, setProductType] = useState("individual");
  const [isSearchModalopen, setIsSearchModalopen] = useState(true);
  const [isCreateTypeModalOpen, setIsCreateTypeModalOpen] = useState(true);
  const [suppliersOptions, setSuppliersOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const suppliers = useCustomSelector((state) => state.createProduct.suppliers);
  const dispatch = useCustomDispatch();

  const handleGetProductById = async () => {
    const response = await getProductByIdService(id);
    console.log(response);
    const selectedSuppliers = response.supliers.map((supplier: any) => ({
      value: supplier.id,
      label: supplier.company,
    }));
    setNewProduct((prevState) => ({
      ...prevState,
      id: response.id,
      name: response.name,
      typeId: response.typeId,
      volume: response.volume,
      maximum: response.maximum,
      barCode: response.barCode,
      price: response.price,
      spent: response.spent,
      productId: null,
      individualQuanty: null,
      img: response.img,
      supliers: selectedSuppliers,
    }));
  };

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getSuppliers());
  }, [dispatch]);

  useEffect(() => {
    if (suppliers.length > 0) {
      const options = suppliers.map((supplier) => ({
        value: supplier.id,
        label: supplier.company,
      }));
      setSuppliersOptions(options);
      console.log(suppliersOptions);
    }
  }, [suppliers]);
  useEffect(() => {
    handleGetProductById();
  }, [id]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
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

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setNewProduct((prevState) => ({
      ...prevState,
      typeId: value,
    }));
  };
  const handleSuppliersChange = (selectedOptions: any) => {
    setNewProduct((prevState) => ({
      ...prevState,
      supliers: selectedOptions,
    }));
  };
  return (
    <div className={style.modalOverlay}>
      <div className={style.principalContainer}>
        <div className={style.closeButtonContainer}>
          <button className={style.closeButton} onClick={handleClose}>
            X
          </button>
        </div>

        <form
          className={style.formContainer}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
        >
          <h2 className={style.formContainer__h2}>Editar Producto</h2>

          <div className={style.inputContainer}>
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
              Nombre *
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
              Precio *
            </label>
            <input
              value={newProduct.price ?? ""}
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
            <label htmlFor="inputVolume" className={style.form__label}>
              Inventario *
            </label>
            <input
              value={newProduct.volume ?? ""}
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
              Tope *
            </label>
            <input
              value={newProduct.maximum ?? ""}
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
                value={newProduct.typeId ?? ""}
                onChange={handleTypeChange}
                name="inputType"
                id="inputType"
              >
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
            <label htmlFor="inputImg" className={style.form__label}>
              URL Imagen
            </label>
            <input
              value={newProduct.img ?? ""}
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
                />
              </label>
              <label htmlFor="pacaRadio">
                Paca
                <input type="radio" name="tipo" id="pacaRadio" value="paca" />
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
                    type="text"
                    id="inputIndividualId"
                    className={style.form__inputText}
                    disabled
                  />
                  <button
                    type="button"
                    className={style.principalContainer__btn}
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
                  value={newProduct.individualQuanty ?? ""}
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
            isMulti
            options={suppliersOptions}
            value={newProduct.supliers}
            onChange={handleSuppliersChange}
          />

          <button type="submit" className={style.formContainer__btn}>
            Editar producto
          </button>
          {!isSearchModalopen && (
            <SearchSide onClose={handleClose} isModal={true} />
          )}
        </form>
        {!isCreateTypeModalOpen && <CreateTypeModal onClose={handleClose} />}
      </div>
    </div>
  );
}
