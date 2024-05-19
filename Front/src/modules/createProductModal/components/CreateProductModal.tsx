import style from "../styles/CreateProductModal.module.css";
import { useState, useEffect } from "react";
import { useCustomSelector, useCustomDispatch } from "../../../store/hooks";
import { getSuppliers } from "../redux/createProductSlice";

export default function CreateProductModal() {
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const dispatch = useCustomDispatch();
  const suppliers = useCustomSelector((state) => state.createProduct.suppliers);

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
        <form action="submit" className={style.formContainer}>
          <h2>Crear Producto</h2>
          <div>
            <label htmlFor="inputName" className={style.form__label}>
              Nombre
            </label>
            <input
              type="text"
              id="inputName"
              className={style.form__inputText}
            />
          </div>
          <div>
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
          <div>
            <label htmlFor="inputPrice" className={style.form__label}>
              Precio
            </label>
            <input
              type="text"
              id="inputPrice"
              className={style.form__inputText}
            />
          </div>

          <label htmlFor="inputVolume" className={style.form__label}>
            Inventario
          </label>
          <input
            type="text"
            id="inputVolume"
            className={style.form__inputText}
          />
          <label htmlFor="inputMaximum" className={style.form__label}>
            Tope
          </label>
          <input
            type="text"
            name=""
            id="inputMaximum"
            className={style.form__inputText}
          />
          <label htmlFor="inputType" className={style.form__label}>
            Clasificación
          </label>
          <input type="text" id="inputType" className={style.form__inputText} />
          <label htmlFor="inputImg" className={style.form__label}>
            URL Imagen
          </label>
          <input type="text" id="inputImg" className={style.form__inputText} />
          <label htmlFor="inputSpent" className={style.form__label}>
            Verdura
          </label>
          <input type="checkbox" name="" id="inputSpent" />
          <label htmlFor="inputSuppliers" className={style.form__label}>
            Proveedores
          </label>
          <select
            multiple={true}
            id="inputSuppliers"
            value={selectedSuppliers}
            onChange={handleSupplierSelection}
          >
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.company}
              </option>
            ))}
          </select>
          <button type="submit">Crear producto</button>
        </form>
      </div>
    </div>
  );
}
