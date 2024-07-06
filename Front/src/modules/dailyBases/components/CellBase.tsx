import style from "../styles/CellBase.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { getUserName } from "../../spents/services/getUserName";

type CellBaseProps = {
  id: string;
  type: string;
  observation: string;
  total: number;
  userId: string;
  date: string;
};

export default function CellBase({
  type,
  date,
  total,
  userId,
  observation,
}: CellBaseProps) {
  const [usernameState, setUserNameState] = useState("");
  const fromatedPrice = new Intl.NumberFormat("es-CO").format(total);
  const formattedDateCreate = new Date(date).toLocaleDateString();

  const getUserNameHandle = async () => {
    const userName = await getUserName(userId);
    setUserNameState(userName);
  };

  useEffect(() => {
    getUserNameHandle();
  }, []);

  return (
    <div className={style.principalContainer}>
      <div className={style.prepertyContainer}>{formattedDateCreate}</div>
      <div className={style.prepertyContainer}>{type}</div>
      <div className={style.prepertyContainer}>{observation}</div>
      <div className={style.prepertyContainer}>{fromatedPrice}</div>
      <div className={style.prepertyContainer}>{usernameState}</div>
    </div>
  );
}
