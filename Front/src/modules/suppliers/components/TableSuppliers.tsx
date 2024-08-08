import style from "../styles/TableSuppliers.module.css";
import CellSuppliers from "./CellSuppliers";
import warningIcon from "../../../utils/Icons/73028warning_109526.svg";
import { useCustomSelector } from "../../../store/hooks";

export interface Base {
  date: string;
  type: string;
  total: number;
  userId: string;
  id: string;
  observation: string;
}

export default function TableSuppliers() {
  const suppliers = useCustomSelector((state) => state.suppliers.suppliersCopy);
  return (
    <div className={style.principalContainer}>
      <div>
        {suppliers.length > 0 ? (
          suppliers.map((supplier) => (
            <CellSuppliers key={supplier.id} id={supplier.id} />
          ))
        ) : (
          <div className={style.principalContainer_notFound}>
            <img
              src={warningIcon}
              alt="warningIcon"
              className={style.principalContainer_icon}
            />
            <h3 className={style.principalContainer_h3}>
              Bases no encontradas
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
