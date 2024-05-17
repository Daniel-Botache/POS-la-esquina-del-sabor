import style from "../styles/CreateProductModal.module.css";
import { useState } from "react";
import { useCustomSelector, useCustomDispatch } from "../../../store/hooks";

export default function CreateProductModal() {
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const dispatch = useCustomDispatch();
  const suppliers = useCustomSelector(selectAllSuppliers);

  const handleSupplierSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedSuppliers(selectedOptions);
  };
  return;
  <div className={style.modalOverlay}>
    <div className={style.principalContainer}>
      <form action="submit">
        <label htmlFor="inputName">Nombre</label>
        <input type="text" id="inputName" />
        <label htmlFor="inputBarCode">Cod. Barras</label>
        <input type="text" id="inputBarCode" />
        <label htmlFor="inputPrice">Precio</label>
        <input type="text" id="inputPrice" />
        <label htmlFor="inputVolume">Inventario</label>
        <input type="text" id="inputVolume" />
        <label htmlFor="inputMaximum">Tope</label>
        <input type="text" name="" id="inputMaximum" />
        <label htmlFor="inputType">Clasificación</label>
        <input type="text" id="inputType" />
        <label htmlFor="inputImg">URL Imagen</label>
        <input type="text" id="inputImg" />
        <label htmlFor="inputSpent">Verdura</label>
        <input type="checkbox" name="" id="inputSpent" />
        <label htmlFor="inputSuppliers">Proveedores</label>
        <select
          multiple={true}
          id="inputSuppliers"
          value={selectedSuppliers}
          onChange={handleSupplierSelection}
        >
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}
            </option>
          ))}
        </select>
      </form>
    </div>
  </div>;
}
