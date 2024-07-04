import style from "../styles/CellExpenses.module.css";
import { useEffect } from "react";
import { useCustomSelector } from "../../../store/hooks";
import { useState } from "react";
import { getUserName } from "../services/getUserName";

type CellExpenseProps = {
  id: number;
  type: string;
  suplierId: string;
  description: string;
  createdAt: Date;
  total: number;
  userId: string;
};

export default function CellExpenses({
  id,
  type,
  suplierId,
  description,
  createdAt,
  total,
  userId,
}: CellExpenseProps) {
  const supliers = useCustomSelector((state) => state.createProduct.suppliers);
  const [supliernameState, setSuplierNameState] = useState("");
  const [usernameState, setUserNameState] = useState("");
  const fromatedPrice = new Intl.NumberFormat("es-CO").format(total);
  const formattedDateCreate = new Date(createdAt).toLocaleDateString();

  const getUserNameHandle = async () => {
    const userName = await getUserName(userId);
    setUserNameState(userName);
  };

  useEffect(() => {
    const suplierName = supliers.filter((suplier) => suplier.id == suplierId);
    setSuplierNameState(suplierName[0].company);
    getUserNameHandle();
  }, []);

  return (
    <div className={style.principalContainer}>
      <div className={style.prepertyContainer}>{id}</div>
      <div className={style.prepertyContainer}>{description}</div>
      <div className={style.prepertyContainer}>{type}</div>
      <div className={style.prepertyContainer}>{supliernameState}</div>
      <div className={style.prepertyContainer}>{formattedDateCreate}</div>
      <div className={style.prepertyContainer}>{fromatedPrice}</div>
      <div className={style.prepertyContainer}>{usernameState}</div>
    </div>
  );
}
