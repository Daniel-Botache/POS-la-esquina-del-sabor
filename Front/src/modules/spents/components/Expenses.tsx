import style from "../styles/Spents.module.css";
import { AddIcon, SearchIcon } from "../../../utils/Icons/icons";
import CreateExpenseModal from "./CreateExpenseModal";
import React, { useEffect, useState } from "react";
import { useCustomDispatch, useCustomSelector } from "../../../store/hooks";
import { getSuppliers } from "../../createProductModal/redux/createProductSlice";
import { getExpensesToday } from "../services/getExpensesToday";
import { addExpenses, addExpensesCopy } from "../redux/spentSlice";
import TableExpenses from "./TableExpenses";
import { getExpensesyDate } from "../services/getExpensesByDate";
import TotalFooterExpenses from "./TotalFooterExpenses";
interface IndexArrayData {
  time: string;
  value: number;
}
export interface ExpensesI {
  id: number;
  type: string;
  suplierId: string;
  description: string;
  createdAt: string;
  total: number;
  userId: string;
}

export default function Expenses() {
  const [createExpenseModaOpen, setCreateExpenseModaOpen] = useState(false);
  const [typeSort, setTypeSort] = useState("");
  const [filterInitialDate, setFilterInitialDate] = useState("");
  const [filterFinalDate, setFilterFinalDate] = useState("");
  const dispatch = useCustomDispatch();
  const supliers = useCustomSelector((state) => state.createProduct.suppliers);
  const expenses = useCustomSelector((state) => state.spent.expenses);
  const expensesCopy = useCustomSelector((state) => state.spent.expensesCopy);

  const getExpensesTodayHandler = async () => {
    const data = await getExpensesToday();
    dispatch(addExpenses({ expenses: data }));
    dispatch(addExpensesCopy({ expensesCopy: data }));
  };

  const toggleModalExpense = () => {
    setCreateExpenseModaOpen(!createExpenseModaOpen);
  };

  useEffect(() => {
    dispatch(getSuppliers());
    getExpensesTodayHandler();
  }, []);

  const searchByDateHandle = async () => {
    const data = await getExpensesyDate(filterInitialDate, filterFinalDate);
    dispatch(addExpenses({ expenses: data }));
    dispatch(addExpensesCopy({ expensesCopy: data }));
  };

  const filterBySupplierHandle = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (event.target.value !== "") {
      const filteredExpense = expenses.filter(
        (expense) => expense.suplierId == event.target.value
      );
      dispatch(addExpensesCopy({ expensesCopy: filteredExpense }));
      return;
    }
    dispatch(addExpensesCopy({ expensesCopy: expenses }));
  };

  const filterByTypeHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value !== "") {
      const filteredExpense = expenses.filter(
        (expense) => expense.type == event.target.value
      );
      dispatch(addExpensesCopy({ expensesCopy: filteredExpense }));
      return;
    }
    dispatch(addExpensesCopy({ expensesCopy: expenses }));
  };

  const sortByCreationDate = (event: React.MouseEvent<HTMLHRElement>) => {
    event.preventDefault();
    if (typeSort == "creationDateSort") {
      setTypeSort("");
      const arraySorted = [...expensesCopy].sort((a: ExpensesI, b: ExpensesI) =>
        b.createdAt?.localeCompare(a.createdAt)
      );
      dispatch(addExpensesCopy({ expensesCopy: arraySorted }));
      return;
    }
    setTypeSort("creationDateSort");
    const arraySorted = [...expensesCopy].sort((a: ExpensesI, b: ExpensesI) =>
      a.createdAt?.localeCompare(b.createdAt)
    );
    dispatch(addExpensesCopy({ expensesCopy: arraySorted }));
  };

  const sortByTotal = (event: React.MouseEvent<HTMLHRElement>) => {
    event.preventDefault();
    if (typeSort == "totalSort") {
      setTypeSort("");
      const arraySorted = [...expensesCopy].sort(
        (a: ExpensesI, b: ExpensesI) => b.total - a.total
      );
      dispatch(addExpensesCopy({ expensesCopy: arraySorted }));
      return;
    }
    setTypeSort("totalSort");
    const arraySorted = [...expensesCopy].sort(
      (a: ExpensesI, b: ExpensesI) => a.total - b.total
    );
    dispatch(addExpensesCopy({ expensesCopy: arraySorted }));
  };

  const calculateTotal = () => {
    let total = 0;
    let grahpArrayData: IndexArrayData[] = [];
    expensesCopy.forEach((expense) => {
      total = expense.total + total;
      const formattedDateCreate = new Date(expense.createdAt);
      const year = formattedDateCreate.getFullYear();
      const month = String(formattedDateCreate.getMonth() + 1).padStart(2, "0"); // Los meses son base 0 en JavaScript
      const day = String(formattedDateCreate.getDate()).padStart(2, "0");
      const formatedToChartDate = `${year}-${month}-${day}`;

      const objectData = {
        time: formatedToChartDate,
        value: total,
      };
      grahpArrayData.push(objectData);
    });
    grahpArrayData.sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );
    grahpArrayData = grahpArrayData.filter(
      (item, index, self) => index === 0 || item.time !== self[index - 1].time
    );
    const totals = {
      total: total,

      grahpArrayData: grahpArrayData,
    };
    return totals;
  };

  return (
    <div className={style.principalContainer}>
      <div className={style.headContainer}>
        <div className={style.optionContainer}>
          <div className={style.inputContainer}>
            <label htmlFor="desdeDate" className={style.inputContainer__label}>
              Desde:
            </label>
            <input
              onChange={(e) => setFilterInitialDate(e.target.value)}
              type="date"
              name=""
              id="desdeDate"
              className={style.inputContainer__input}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="hastaDate" className={style.inputContainer__label}>
              Hasta:
            </label>
            <input
              type="date"
              name=""
              id="hastaDate"
              className={style.inputContainer__input}
              onChange={(e) => setFilterFinalDate(e.target.value)}
            />
          </div>
          <button
            className={style.principalContainer__btn}
            onClick={searchByDateHandle}
          >
            <SearchIcon className={style.principalContainer_icon} />
          </button>
        </div>
        <div className={style.optionContainer}>
          <label htmlFor="suplierInput" className={style.inputContainer__label}>
            {" "}
            Proveedor:
          </label>
          <select
            onChange={filterBySupplierHandle}
            name="suplierInput"
            id="suplierInput"
            className={style.optionContainer__select}
          >
            <option value="">Todos</option>
            {supliers.length > 0
              ? supliers.map((suplier) => (
                  <option key={suplier.id} value={suplier.id}>
                    {suplier.company}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className={style.optionContainer}>
          <label htmlFor="typeInput" className={style.inputContainer__label}>
            {" "}
            Tipo:
          </label>
          <select
            onChange={filterByTypeHandle}
            name="typeInput"
            id="typeInput"
            className={style.optionContainer__select}
          >
            <option value="">Todos</option>
            <option value="Pago proveedor">Pago proveedor</option>
            <option value="Nomina">Nómina</option>
            <option value="Pago externo">Pago externo</option>
          </select>
        </div>
        <div
          className={style.headContainer__button}
          onClick={toggleModalExpense}
        >
          <AddIcon className={style.headContainer__button__icon} />
          <p className={style.headContainer__button__p}>Agregar gasto</p>
        </div>
        {createExpenseModaOpen && (
          <CreateExpenseModal onClose={toggleModalExpense} />
        )}
      </div>
      <div className={style.titleContainer}>
        <h3 className={style.titleContainer__h3}>Id:</h3>
        <h3 className={style.titleContainer__h3}>Descripción:</h3>
        <h3 className={style.titleContainer__h3}>Tipo:</h3>
        <h3 className={style.titleContainer__h3}>Proveedor:</h3>
        <h3 className={style.titleContainer__h3} onClick={sortByCreationDate}>
          Fecha:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "creationDateSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3} onClick={sortByTotal}>
          Total:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "totalSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>Usuario: </h3>
      </div>
      <TableExpenses></TableExpenses>
      <TotalFooterExpenses totals={calculateTotal()} />
    </div>
  );
}
