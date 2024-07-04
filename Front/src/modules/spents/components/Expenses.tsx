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

export default function Expenses() {
  const [createExpenseModaOpen, setCreateExpenseModaOpen] = useState(false);
  const [typeSort, setTypeSort] = useState("");
  const [filterInitialDate, setFilterInitialDate] = useState("");
  const [filterFinalDate, setFilterFinalDate] = useState("");
  const dispatch = useCustomDispatch();
  const supliers = useCustomSelector((state) => state.createProduct.suppliers);
  const expenses = useCustomSelector((state) => state.spent.expenses);

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
        <h3 className={style.titleContainer__h3}>
          Fecha:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "creationDateSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>
          Total:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "totalSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>
          Usuario:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "totalSort" ? "▼" : "▶"}
          </span>
        </h3>
      </div>
      <TableExpenses></TableExpenses>
    </div>
  );
}
