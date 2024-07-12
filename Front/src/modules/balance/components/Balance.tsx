import style from "../styles/balance.module.css";
import { SearchIcon } from "../../../utils/Icons/icons";
import { useEffect, useState } from "react";
import TableBalance from "./TableBalance";
import { getBasesByDate } from "../../dailyBases/services/getBasesByDate";
import { getEBasesToday } from "../../dailyBases/services/getBasesToday";
import { getSalesToday } from "../../profit/services/getSalesToday";
import { getSalesByDate } from "../../profit/services/getSalesByDate";
import { getExpensesToday } from "../../spents/services/getExpensesToday";
import { getExpensesyDate } from "../../spents/services/getExpensesByDate";
import { Base } from "../../dailyBases/services/postBase";
import { ExpensesI } from "../../spents/components/Expenses";
import { Sales } from "../../profit/redux/profitSlice";
import { BalanceI } from "./TableBalance";

export default function Balance() {
  const [filterInitialDate, setFilterInitialDate] = useState("");
  const [filterFinalDate, setFilterFinalDate] = useState("");
  const [typeSort, setTypeSort] = useState("");
  const [balanceSearched, setBalanceSearched] = useState<BalanceI[]>([]);
  const [balanceSearchedCopy, setBalanceSearchedCopy] = useState<BalanceI[]>(
    []
  );

  const balanceTodayhandle = async () => {
    const arrayToday = [];
    const baseDataToday = await getEBasesToday();
    let baseTotalToday = 0;
    baseDataToday.forEach((base: Base) => {
      baseTotalToday = baseTotalToday + base.total;
    });
    const expensesDataToday = await getExpensesToday();
    let expenseTotalToday = 0;
    expensesDataToday.forEach((expense: ExpensesI) => {
      expenseTotalToday = expenseTotalToday + expense.total;
    });
    const profitsDataToday = await getSalesToday();
    let profitTotalToday = 0;
    profitsDataToday.forEach((sale: Sales) => {
      if (!sale.credit) {
        profitTotalToday = profitTotalToday + sale.total;
      }
    });

    const balanceToday = {
      base: baseTotalToday,
      date: new Date().toISOString(),
      totalSpent: expenseTotalToday,
      totalProfit: profitTotalToday,
      balance: baseTotalToday - expenseTotalToday + profitTotalToday,
      percentageProfit:
        (profitTotalToday - expenseTotalToday) * (100 / expenseTotalToday),
    };
    arrayToday.push(balanceToday);
    console.log(arrayToday);
    setBalanceSearched(arrayToday);
    setBalanceSearchedCopy(arrayToday);
  };

  const balanceByDateHandle = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const objectBases: { [key: string]: BalanceI } = {};
    const basesByDate = await getBasesByDate(
      filterInitialDate,
      filterFinalDate
    );
    const salesByDate = await getSalesByDate(
      filterInitialDate,
      filterFinalDate
    );
    const expensesByDate = await getExpensesyDate(
      filterInitialDate,
      filterFinalDate
    );
    basesByDate.forEach((base: Base) => {
      objectBases[base.date] = {
        ...objectBases[base.date],
        base: base.total,
      };
    });
    console.log(objectBases);
  };

  useEffect(() => {
    balanceTodayhandle();
  }, []);

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
            <label htmlFor="hastaDate" className={style.inputContainer__label}>
              Hasta:
            </label>
            <input
              onChange={(e) => setFilterFinalDate(e.target.value)}
              type="date"
              name=""
              id="hastaDate"
              className={style.inputContainer__input}
            />
          </div>
          <button
            className={style.principalContainer__btn}
            onClick={balanceByDateHandle}
          >
            <SearchIcon className={style.principalContainer_icon} />
          </button>
        </div>
        <div className={style.optionContainer}>
          <label htmlFor="balanceType" className={style.inputContainer__label}>
            {" "}
            Tipo de ganancia
          </label>
          <select
            name="balanceType"
            id="balanceType"
            className={style.optionContainer__select}
          >
            <option value="">Todos</option>
            <option value="cash">Efectivo</option>
            <option value="transaction">Transferencia</option>
          </select>
        </div>
      </div>
      <div className={style.titleContainer}>
        <h3 className={style.titleContainer__h3}>
          Fecha:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "creationDateSort" ? "▼" : "▶"}
          </span>
        </h3>

        <h3 className={style.titleContainer__h3}>
          Gasto:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "spentTotalSort" ? "▼" : "▶"}
          </span>
        </h3>

        <h3 className={style.titleContainer__h3}>
          Ingreso Total:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "totalSort" ? "▼" : "▶"}
          </span>
        </h3>

        <h3 className={style.titleContainer__h3}>
          Balance:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "balanceSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>
          Ganancia %:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "perentageSort" ? "▼" : "▶"}
          </span>
        </h3>
      </div>
      <TableBalance balances={balanceSearchedCopy} />
    </div>
  );
}
