import style from "../styles/TableClient.module.css";
import { useCustomSelector } from "../../../store/hooks";
import { Client } from "../redux/clientSlice";
import CellCLient from "./CellClient";
import warningIcon from "../../../utils/Icons/73028warning_109526.svg";

export default function TableClient() {
  const clients = useCustomSelector((state) => state.clients.clientsCopy);

  return (
    <div className={style.principalContainer}>
      <div>
        {clients.length > 0 ? (
          clients.map((client: Client) => (
            <CellCLient
              key={client.id}
              id={client.id}
              name={client.name}
              address={client.address}
              tel={client.tel}
              clientType={client.clientType}
              lastPayment={client.lastPayment}
              quotaMax={client.quotaMax}
              ban={client.ban}
              remainingQuota={client.remainingQuota}
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
              clientes no encontrados
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
