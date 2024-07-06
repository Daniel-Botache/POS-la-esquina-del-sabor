import style from "../styles/TableBase.module.css";
import CellBase from "./CellBase";
import warningIcon from "../../../utils/Icons/73028warning_109526.svg";

export interface Base {
  date: string;
  type: string;
  total: number;
  userId: string;
  id: string;
  observation: string;
}

type TableBaseProps = {
  bases: Base[];
};

export default function TableBase({ bases }: TableBaseProps) {
  return (
    <div className={style.principalContainer}>
      <div>
        {bases.length > 0 ? (
          bases.map((base) => (
            <CellBase
              key={base.id}
              id={base.id}
              type={base.type}
              date={base.date}
              userId={base.userId}
              total={base.total}
              observation={base.observation}
            />
          ))
        ) : (
          <div className={style.principalContainer_notFound}>
            <img
              src={warningIcon}
              alt="warningIcon"
              className={style.principalContainer_icon}
            />
            <h3 className={style.principalContainer_h3}>
              Gastos no encontrados
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
