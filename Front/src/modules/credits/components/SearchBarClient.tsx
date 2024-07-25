import style from "../styles/SearchBarClient.module.css";
import { SearchIcon } from "../../../utils/Icons/icons";
import { getClientById } from "../services/getClientById";
import { addClient, addClientCopy } from "../redux/clientSlice";
import { useCustomDispatch } from "../../../store/hooks";
import React, { useState } from "react";

export default function SearchBarClient() {
  const [clientIdSate, setClientIdSate] = useState("");
  const dispatch = useCustomDispatch();

  const searchCLientHandle = async (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const clientData = await getClientById(clientIdSate);

    if (clientData) {
      dispatch(addClient({ clients: clientData }));
      dispatch(addClientCopy({ clientsCopy: clientData }));
      setClientIdSate("");
    }
    console.log("Holi");
  };

  const takeclientIdHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const clientId = event.target.value;
    setClientIdSate(clientId);
  };

  const handleInputEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await searchCLientHandle(e);
    }
  };
  return (
    <div className={style.principalContainer}>
      <input
        type="text"
        placeholder="Buscar Cliente"
        className={style.principalContainer__input}
        onChange={takeclientIdHandle}
        onKeyDown={handleInputEnter}
        value={clientIdSate}
      />
      <button
        className={style.principalContainer__btn}
        onClick={searchCLientHandle}
      >
        <SearchIcon className={style.principalContainer__icon} />
      </button>
    </div>
  );
}
