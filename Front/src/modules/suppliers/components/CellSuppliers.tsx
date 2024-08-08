import style from "../styles/CellSuppliers.module.css";
import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "../../../utils/Icons/icons";
import CreateSupplierModal from "../../createSupplierModal/components/CreateSupplierModal";
import { succesMessage, errorMessage } from "../../auth/hooks/notifications";
import { changeDeleteStatus } from "../../Inventory/redux/stockSlice";
import { useCustomDispatch, useCustomSelector } from "../../../store/hooks";
import { Supplier } from "../redux/supplierSlice";
import { getSupplierById } from "../services/getSupplierById";
import { deleteSupplier } from "../services/deleteSupplier";

type SupplierProps = { id: string };

export default function CellSuppliers({ id }: SupplierProps) {
  const deletedStatus = useCustomSelector((state) => state.stock.deleted);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [supplierObject, setSupplierObject] = useState<Supplier>();
  const dispatch = useCustomDispatch();

  const formattedDateCreate = new Date(
    supplierObject ? supplierObject.createdAt : ""
  ).toLocaleDateString();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getSupplierInfoHandle = async () => {
    try {
      const supplierData = await getSupplierById(id);
      if (supplierData) {
        setSupplierObject(supplierData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSupplierInfoHandle();
  }, [deletedStatus]);

  const deleteSupplierHandle = async () => {
    try {
      const confirmDelete = confirm(
        "¿Seguro desea eliminar el proveedor? No podrá volver a recuperar sus datos ni los relacionados"
      );
      if (confirmDelete) {
        const deletedSupplier = await deleteSupplier(id);
        console.log(confirmDelete);
        if (deletedSupplier) {
          dispatch(changeDeleteStatus());
          return succesMessage("Proveedor eliminado ");
        }
        return errorMessage("No ha sido posible eliminar el proveedor");
      }
      return;
    } catch (error) {
      return errorMessage("No ha sido posible eliminar el proveedor");
    }
  };

  return (
    <div className={style.principalContainer}>
      <div className={style.prepertyContainer}>{supplierObject?.company}</div>
      <div className={style.prepertyContainer}>{supplierObject?.adviser}</div>
      <div className={style.prepertyContainer}>{supplierObject?.tel}</div>
      <div className={style.prepertyContainer}>{formattedDateCreate}</div>
      <div className={style.prepertyContainer}>
        {supplierObject?.products.length}
      </div>

      <div className={style.prepertyContainer_options}>
        <button
          className={style.prepertyContainer__btn}
          onClick={deleteSupplierHandle}
        >
          <DeleteIcon className={style.prepertyContainer__deleteIcon} />
        </button>
        <button className={style.prepertyContainer__btn} onClick={toggleModal}>
          <EditIcon className={style.prepertyContainer__editIcon} />
        </button>
      </div>
      {isModalOpen && (
        <CreateSupplierModal
          edit={true}
          id={id}
          company={supplierObject ? supplierObject.company : ""}
          tel={supplierObject ? supplierObject.tel : ""}
          adviser={supplierObject ? supplierObject.adviser : ""}
          onClose={toggleModal}
        />
      )}
    </div>
  );
}
