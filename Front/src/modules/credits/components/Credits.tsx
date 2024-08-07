import style from "../styles/Credits.module.css";
import { AddIcon, FilterIcon, SearchIcon } from "../../../utils/Icons/icons";
import { useState } from "react";
import { useCustomDispatch, useCustomSelector } from "../../../store/hooks";
import SearchBarClient from "./SearchBarClient";
import TableClient from "./TableClient";
import { Client } from "../redux/clientSlice";
import { addClientCopy } from "../redux/clientSlice";

import CreateClientModal from "./CreateClientModal";

export default function Credits() {
  const dispatch = useCustomDispatch();
  const clients = useCustomSelector((state) => state.clients.clients);
  const clientsCopy = useCustomSelector((state) => state.clients.clientsCopy);
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [typeSort, setTypeSort] = useState("");

  const [filterType, setFilterType] = useState("todos");
  const [dateFilter, setDateFilter] = useState(0);
  const [filterQuantySince, setFilterQuantySince] = useState(0);
  const [filterQuantyTo, setFilterQuantyTo] = useState(Infinity);
  const [isModalCreateClientOpen, setIsModalCreateClientOpen] = useState(false);
  const dateToday = new Date();
  const year = dateToday.getFullYear();
  const month = String(dateToday.getMonth() + 1).padStart(2, "0");
  const day = String(dateToday.getDate()).padStart(2, "0");
  const formatedToChartDate = `${year}-${month}-${day}`;

  const toggleModalFilters = () => {
    setIsFiltersModalOpen(!isFiltersModalOpen);
  };

  const toggleModalCreateClient = () => {
    setIsModalCreateClientOpen(!isModalCreateClientOpen);
  };

  const sortByName = (event: React.MouseEvent<HTMLHRElement>) => {
    event.preventDefault();
    if (typeSort == "nameSort") {
      setTypeSort("");
      const arraySorted = [...clientsCopy].sort((a: Client, b: Client) =>
        b.name?.localeCompare(a.name)
      );
      dispatch(addClientCopy({ clientsCopy: arraySorted }));
      return;
    }
    setTypeSort("nameSort");
    const arraySorted = [...clientsCopy].sort((a: Client, b: Client) =>
      a.name?.localeCompare(b.name)
    );
    dispatch(addClientCopy({ clientsCopy: arraySorted }));
  };

  const sortByLastPayment = (event: React.MouseEvent<HTMLHRElement>) => {
    event.preventDefault();
    if (typeSort == "lastPaymentSort") {
      setTypeSort("");
      const arraySorted = [...clientsCopy].sort((a: Client, b: Client) =>
        b.lastPayment !== null
          ? b.lastPayment.localeCompare(
              a.lastPayment !== null ? a.lastPayment : new Date().toISOString()
            )
          : new Date()
              .toISOString()
              .localeCompare(
                a.lastPayment !== null
                  ? a.lastPayment
                  : new Date().toISOString()
              )
      );
      dispatch(addClientCopy({ clientsCopy: arraySorted }));
      return;
    }
    setTypeSort("lastPaymentSort");
    const arraySorted = [...clientsCopy].sort((a: Client, b: Client) =>
      a.lastPayment !== null
        ? a.lastPayment.localeCompare(
            b.lastPayment !== null ? b.lastPayment : new Date().toISOString()
          )
        : new Date()
            .toISOString()
            .localeCompare(
              b.lastPayment !== null ? b.lastPayment : new Date().toISOString()
            )
    );
    dispatch(addClientCopy({ clientsCopy: arraySorted }));
  };

  const sortByRemainingQuota = (event: React.MouseEvent<HTMLHRElement>) => {
    event.preventDefault();
    if (typeSort == "remainingQuotaSort") {
      setTypeSort("");
      const arraySorted = [...clientsCopy].sort(
        (a: Client, b: Client) => b.remainingQuota - a.remainingQuota
      );
      dispatch(addClientCopy({ clientsCopy: arraySorted }));
      return;
    }
    setTypeSort("remainingQuotaSort");
    const arraySorted = [...clientsCopy].sort(
      (a: Client, b: Client) => a.remainingQuota - b.remainingQuota
    );
    dispatch(addClientCopy({ clientsCopy: arraySorted }));
  };

  const sortByTotalCredit = (event: React.MouseEvent<HTMLHRElement>) => {
    event.preventDefault();
    if (typeSort == "totalCreditSort") {
      setTypeSort("");
      const arraySorted = [...clientsCopy].sort(
        (a: Client, b: Client) =>
          b.quotaMax - b.remainingQuota - (a.quotaMax - a.remainingQuota)
      );
      dispatch(addClientCopy({ clientsCopy: arraySorted }));
      return;
    }
    setTypeSort("totalCreditSort");
    const arraySorted = [...clientsCopy].sort(
      (a: Client, b: Client) =>
        a.quotaMax - a.remainingQuota - (b.quotaMax - b.remainingQuota)
    );
    dispatch(addClientCopy({ clientsCopy: arraySorted }));
  };

  const handleTypeSelected = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const typeIdSelected = event.target.value;
    setFilterType(typeIdSelected);
    const filteredClients = clients.filter((client) => {
      const matchesType =
        typeIdSelected === "todos" || client.clientType === typeIdSelected;
      return matchesType;
    });
    dispatch(addClientCopy({ clientsCopy: filteredClients }));
  };

  const filterAllHandle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const initialDate = dateFilter ? new Date(dateFilter) : null;
    if (initialDate) initialDate.setHours(0, 0, 0, 0);
    const filteredClients = clients.filter((client) => {
      const clientDate = new Date(
        client.lastPayment !== null ? client.lastPayment : new Date()
      );
      clientDate.setHours(0, 0, 0, 0);
      const matchDate = !initialDate || clientDate <= initialDate;
      const matchesType =
        filterType === "todos" || client.clientType === filterType;
      const matchVolume =
        filterQuantySince <= client.quotaMax - client.remainingQuota &&
        client.quotaMax - client.remainingQuota <= filterQuantyTo;
      return matchDate && matchesType && matchVolume;
    });
    dispatch(addClientCopy({ clientsCopy: filteredClients }));
  };

  const handleFilterDateInitial = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = event.target.value;
    if (date == "") {
      setDateFilter(0);
      return;
    }
    const isoDate = new Date(date).toISOString();
    const parseDate = Date.parse(isoDate) + 86400000;

    setDateFilter(parseDate);
  };

  const handleQuantySinceFilter = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const quanty = Number(event.target.value);
    if (event.target.value == "") {
      setFilterQuantySince(0);
      return;
    }
    setFilterQuantySince(quanty);
  };

  const handleQuantyToFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quanty = Number(event.target.value);
    if (event.target.value == "" || quanty == 0) {
      setFilterQuantyTo(Infinity);
      return;
    }
    setFilterQuantyTo(quanty);
  };

  return (
    <div className={style.principalContainer}>
      <div className={style.searchBarContainer}>
        <SearchBarClient />
        <div className={style.orderContainer}>
          <div
            className={style.headContainer__button}
            onClick={toggleModalCreateClient}
          >
            <AddIcon className={style.headContainer__button__icon} />
            <p className={style.headContainer__button__p}>Crear cliente</p>
          </div>
          <div
            className={style.headContainer__button}
            onClick={toggleModalFilters}
          >
            <FilterIcon className={style.headContainer__button__icon} />
            <p className={style.headContainer__button__p}>Filtros</p>
          </div>
        </div>
      </div>
      <div
        className={
          isFiltersModalOpen
            ? style.filterContainer
            : style.filterContainer_hidden
        }
      >
        <div className={style.optionContainer}>
          <h3 className={style.optionContainer__h3}>Última fecha de pago:</h3>
          <div className={style.inputContainer}>
            <label htmlFor="desdeDate" className={style.inputContainer__label}>
              Desde:
            </label>
            <input
              type="date"
              name=""
              id="desdeDate"
              max={formatedToChartDate}
              className={style.inputContainer__input}
              onChange={handleFilterDateInitial}
            />
          </div>
        </div>
        <div className={style.optionContainer}>
          <h3 className={style.optionContainer__h3}>Tipo de cliente:</h3>
          <select
            name=""
            id=""
            defaultValue={"todos"}
            className={style.optionContainer__select}
            onChange={handleTypeSelected}
          >
            <option value="todos">Todos</option>
            <option value="VIP">VIP</option>
            <option value="Regular">Regular</option>
            <option value="Moroso">Moroso</option>
          </select>
        </div>

        <div className={style.optionContainer}>
          <h3 className={style.optionContainer__h3}>Total del crédito</h3>
          <div className={style.inputContainer}>
            <label htmlFor="" className={style.inputContainer__label}>
              Desde:
            </label>
            <input
              type="number"
              name=""
              id=""
              className={style.inputContainer__input_number}
              onChange={handleQuantySinceFilter}
            />
            <div className={style.inputContainer__div}></div>
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="" className={style.inputContainer__label}>
              Hasta:
            </label>
            <input
              type="number"
              name=""
              id=""
              className={style.inputContainer__input_number}
              onChange={handleQuantyToFilter}
            />
            <button
              className={style.principalContainer__btn}
              onClick={filterAllHandle}
            >
              <SearchIcon className={style.principalContainer__icon} />
            </button>
          </div>
        </div>
      </div>
      <div className={style.titleContainer}>
        <h3 className={style.titleContainer__h3}>Activo: </h3>
        <h3 className={style.titleContainer__h3}>Cédula: </h3>
        <h3 className={style.titleContainer__h3} onClick={sortByName}>
          Nombre:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "nameSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>Tipo de cliente: </h3>
        <h3 className={style.titleContainer__h3} onClick={sortByLastPayment}>
          Fecha último abono:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "lastPaymentSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3} onClick={sortByLastPayment}>
          Dias de mora:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "lastPaymentSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3} onClick={sortByRemainingQuota}>
          Cupo restante:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "remainingQuotaSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3} onClick={sortByTotalCredit}>
          Total crédito{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "totalCreditSort" ? "▼" : "▶"}
          </span>
        </h3>

        <h3 className={style.titleContainer__h3}>Acciones:</h3>
      </div>
      <TableClient />
      {isModalCreateClientOpen && (
        <CreateClientModal
          id={""}
          name={""}
          edit={false}
          tel={""}
          address={""}
          quotaMax={0}
          ban={true}
          onClose={toggleModalCreateClient}
          remainingQuota={0}
        />
      )}
    </div>
  );
}
