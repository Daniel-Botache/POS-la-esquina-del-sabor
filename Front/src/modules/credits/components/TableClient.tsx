import style from "../styles/TableClient.module.css";
import { useCustomSelector } from "../../../store/hooks";
import { Client } from "../redux/clientSlice";
import CellCLient from "./CellClient";

type TableProps = {
  onCheckboxChange: (product: { id: string }) => void;
};

export default function TableClient({ onCheckboxChange }: TableProps) {
  const clients = useCustomSelector((state) => state.clients.clientsCopy);

  return (
    <div className={style.principalContainer}>
      <div>
        {clients.map((client: Client) => (
          <CellCLient
            key={client.id}
            id={client.id}
            name={client.name}
            address={client.address}
            tel={client.address}
            clientType={client.clientType}
            lastPayment={client.lastPayment}
            quotaMax={client.quotaMax}
            ban={client.ban}
            remainingQuota={client.remainingQuota}
            onCheckboxChange={onCheckboxChange}
          />
        ))}
      </div>
    </div>
  );
}
