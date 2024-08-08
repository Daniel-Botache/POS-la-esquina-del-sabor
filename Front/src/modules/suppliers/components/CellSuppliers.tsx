import style from "../styles/CellSuppliers.module.css";
import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "../../../utils/Icons/icons";
import CreateSupplierModal from "../../createSupplierModal/components/CreateSupplierModal";
import { succesMessage, errorMessage } from "../../auth/hooks/notifications";
import { changeDeleteStatus } from "../../Inventory/redux/stockSlice";
import { useCustomDispatch } from "../../../store/hooks";
import { Supplier } from "../redux/supplierSlice";
import { getSupplierById } from "../services/getSupplierById";

type SupplierProps = { id: string };

export default function CellSuppliers({ id }: SupplierProps) {
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
  }, []);

  const deleteClientHandle = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const confirm = window.confirm(
      "Seguro desea eliminar completamente a este proveedor, no podrá recuperar ninguno de los datos relacionados"
    );
    if (confirm) {
      const deletedClient = 0;
      if (deletedClient) {
        dispatch(changeDeleteStatus());
        succesMessage("Cliente eliminado completamente");
        return;
      }
      errorMessage("Problema con el servidor actualice la página");
      return;
    }
    return;
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
          onClick={deleteClientHandle}
        >
          <DeleteIcon className={style.prepertyContainer__deleteIcon} />
        </button>
        <button className={style.prepertyContainer__btn} onClick={toggleModal}>
          <EditIcon className={style.prepertyContainer__editIcon} />
        </button>
      </div>
      {/* {isModalOpen && (
        <CreateSupplierModal
          edit={true}
          id={id}
          name={name}
          tel={tel}
          address={address}
          ban={ban}
          quotaMax={quotaMax}
          onClose={toggleModal}
          remainingQuota={remainingQuota}
        />
      )} */}
    </div>
  );
}
