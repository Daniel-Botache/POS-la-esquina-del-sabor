import style from "../styles/SearchBarSupplier.module.css";
import { SearchIcon } from "../../../utils/Icons/icons";
import { useCustomDispatch, useCustomSelector } from "../../../store/hooks";
import { useState, useEffect } from "react";
import { addSupplier, addSupplierCopy } from "../redux/supplierSlice";
import { getAllSuppliers } from "../services/getAllSuppliers";
import { getSupplierByName } from "../services/getSupplierByName";

export default function SearchBarSupplier() {
  const [supplierName, setSupplierName] = useState("");
  const dispatch = useCustomDispatch();
  const deleted = useCustomSelector((state) => state.stock.deleted);

  const searchAllClientsHandle = async () => {
    const suppliersData = await getAllSuppliers();
    dispatch(addSupplier({ suppliers: suppliersData }));
    dispatch(addSupplierCopy({ suppliersCopy: suppliersData }));
  };

  const takeSupplierNameHandle = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const supplierName = event.target.value;
    setSupplierName(supplierName);
    const supplierFounded = await getSupplierByName(supplierName);
    console.log(supplierName);
    if (supplierFounded) {
      dispatch(addSupplier({ suppliers: supplierFounded }));
      dispatch(addSupplierCopy({ suppliersCopy: supplierFounded }));
    }
  };

  useEffect(() => {
    searchAllClientsHandle();
  }, [deleted]);

  return (
    <div className={style.principalContainer}>
      <input
        type="text"
        placeholder="Buscar Proveedor"
        className={style.principalContainer__input}
        onChange={takeSupplierNameHandle}
        value={supplierName}
      />
      <button
        className={style.principalContainer__btn}
        onClick={searchAllClientsHandle}
      >
        Buscar Todos
        <SearchIcon className={style.principalContainer__icon} />
      </button>
    </div>
  );
}
