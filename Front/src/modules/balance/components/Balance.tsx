import style from "../styles/balance.module.css";
import { SearchIcon } from "../../../utils/Icons/icons";
import React, { useEffect, useState } from "react";
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
import FooterBalance from "./FooterBalance";

interface IndexArrayData {
  time: string;
  value: number;
}

export default function Balance() {
  const [filterInitialDate, setFilterInitialDate] = useState("");
  const [filterFinalDate, setFilterFinalDate] = useState("");
  const [typeSort, _setTypeSort] = useState("");
  const [balanceSearched, setBalanceSearched] = useState<BalanceI[]>([]);
  const [balanceSearchedCopy, setBalanceSearchedCopy] = useState<BalanceI[]>(
    []
  );

  const calculateTotal = () => {
    let totalBalance = 0;
    let totalCash = 0;
    let totalPercentage = 0;
    let grahpArrayData: IndexArrayData[] = [];
    balanceSearchedCopy.forEach((item) => {
      totalBalance += item.balance;
      totalCash += item.totalCashProfit;
      totalPercentage += item.percentageProfit;
      const formattedDateCreate = new Date(item.date);
      const year = formattedDateCreate.getFullYear();
      const month = String(formattedDateCreate.getMonth() + 1).padStart(2, "0"); // Los meses son base 0 en JavaScript
      const day = String(formattedDateCreate.getDate()).padStart(2, "0");
      const formatedToChartDate = `${year}-${month}-${day}`;
      const objectData = {
        time: formatedToChartDate,
        value: item.balance,
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
      totalBalance: totalBalance,
      totalPercentage: totalPercentage,
      totalCash: totalCash,
      grahpArrayData: grahpArrayData,
    };

    return totals;
  };

  const filterProfitType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "cash") {
      const filteredBalanceCopy: BalanceI[] = balanceSearched.map(
        (balanceItem) => ({
          ...balanceItem,
          balance:
            balanceItem.base -
            balanceItem.totalSpent +
            balanceItem.totalCashProfit,
          totalProfit: balanceItem.totalCashProfit,
          percentageProfit:
            balanceItem.totalSpent === 0
              ? 100
              : Math.round(
                  (balanceItem.totalCashProfit - balanceItem.totalSpent) *
                    (100 / balanceItem.totalSpent)
                ),
        })
      );
      setBalanceSearchedCopy(filteredBalanceCopy);
    } else if (event.target.value === "") {
      setBalanceSearchedCopy([...balanceSearched]);
    } else if (event.target.value === "transaction") {
      const filteredBalanceCopy: BalanceI[] = balanceSearched.map(
        (balanceItem) => ({
          ...balanceItem,
          balance:
            balanceItem.base -
            balanceItem.totalSpent +
            balanceItem.totalTransProfit,
          totalProfit: balanceItem.totalTransProfit,
          percentageProfit:
            balanceItem.totalSpent === 0
              ? 100
              : Math.round(
                  (balanceItem.totalTransProfit - balanceItem.totalSpent) *
                    (100 / balanceItem.totalSpent)
                ),
        })
      );
      setBalanceSearchedCopy(filteredBalanceCopy);
    }
  };

  const normalizeDate = (dateString: string): string => {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0);
    return date.toISOString();
  };

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
    let profitCashTotalToday = 0;
    let profitTransTotalToday = 0;
    profitsDataToday.forEach((sale: Sales) => {
      if (!sale.credit) {
        profitTotalToday = profitTotalToday + sale.total - sale.valueSpent;
        profitCashTotalToday =
          profitCashTotalToday + sale.valueCash - sale.valueSpent;
        profitTransTotalToday = profitTransTotalToday + sale.valueTransaction;
      }
    });

    const balanceToday = {
      base: baseTotalToday,
      date: new Date().toISOString(),
      totalSpent: expenseTotalToday,
      totalProfit: profitTotalToday,
      totalCashProfit: profitCashTotalToday,
      totalTransProfit: profitTransTotalToday,
      balance: baseTotalToday - expenseTotalToday + profitTotalToday,
      percentageProfit:
        expenseTotalToday == 0
          ? 100
          : Math.round(
              (profitTotalToday - expenseTotalToday) * (100 / expenseTotalToday)
            ),
    };
    arrayToday.push(balanceToday);

    setBalanceSearched(arrayToday);
    setBalanceSearchedCopy(arrayToday);
  };

  const balanceByDateHandle = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const objectBases: { [key: string]: BalanceI } = {};
    const arrayByDate: BalanceI[] = [];
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
      const normalizedDate = normalizeDate(base.date);
      if (!objectBases[normalizedDate]) {
        objectBases[normalizedDate] = {
          date: normalizedDate,
          totalSpent: 0,
          totalProfit: 0,
          balance: 0,
          percentageProfit: 0,
          base: 0,
          totalTransProfit: 0,
          totalCashProfit: 0,
        };
      }
      objectBases[normalizedDate].base += base.total;
    });
    salesByDate.forEach((profit: Sales) => {
      const normalizedDate = normalizeDate(profit.createdAt);
      if (!objectBases[normalizedDate]) {
        objectBases[normalizedDate] = {
          date: normalizedDate,
          totalSpent: 0,
          totalProfit: 0,
          balance: 0,
          percentageProfit: 0,
          base: 0,
          totalTransProfit: 0,
          totalCashProfit: 0,
        };
      }
      objectBases[normalizedDate].totalProfit +=
        profit.total - profit.valueSpent;
      objectBases[normalizedDate].totalCashProfit +=
        profit.valueCash - profit.valueSpent;
      objectBases[normalizedDate].totalCashProfit += profit.valueTransaction;
    });
    expensesByDate.forEach((spent: ExpensesI) => {
      const normalizedDate = normalizeDate(spent.createdAt);
      if (!objectBases[normalizedDate]) {
        objectBases[normalizedDate] = {
          date: normalizedDate,
          totalSpent: 0,
          totalProfit: 0,
          balance: 0,
          percentageProfit: 0,
          base: 0,
          totalTransProfit: 0,
          totalCashProfit: 0,
        };
      }
      objectBases[normalizedDate].totalSpent += spent.total;
    });
    Object.entries(objectBases).forEach(([_key, value]) => {
      value.balance = value.base - value.totalSpent + value.totalProfit;
      value.percentageProfit =
        value.totalSpent == 0
          ? 100
          : Math.round(
              (value.totalProfit - value.totalSpent) * (100 / value.totalSpent)
            );
      arrayByDate.push(value);
    });
    setBalanceSearched(arrayByDate);
    setBalanceSearchedCopy(arrayByDate);
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
            onChange={filterProfitType}
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
          Base:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "BaseTotalSort" ? "▼" : "▶"}
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
      <FooterBalance totals={calculateTotal()} />
    </div>
  );
}
