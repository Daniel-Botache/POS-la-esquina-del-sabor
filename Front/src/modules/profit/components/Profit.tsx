import style from "../styles/Profit.module.css";
import { useEffect, useState } from "react";
import { getSalesToday } from "../services/getSalesToday";
import { getSaleByClientId } from "../services/getSaleByClientId";
import { getSaleBySaleId } from "../services/getSaleBySaleId";
import { getSalesByDate } from "../services/getSalesByDate";
import { addSales, addSalesCopy } from "../redux/profitSlice";
import { useCustomDispatch, useCustomSelector } from "../../../store/hooks";
import TableProfit from "./TablePorfit";
import TotalFooter from "./TotalFooter";
import { Sales } from "../redux/profitSlice";

export default function Profit() {
  const dispatch = useCustomDispatch();
  const [typeSort, setTypeSort] = useState("");
  const [inputId, setInputId] = useState("");
  const [filterByBillTypeSales, setFilterBillTypeSales] = useState(true);
  const [filterByBillTypePayment, setFilterBillTypePayment] = useState(true);
  const [filterCash, setFilterCash] = useState(true);
  const [filterTransaction, setFilterTransaction] = useState(true);
  const [filterMix, setFilterMix] = useState(true);
  const sales = useCustomSelector((state) => state.profit.sales);
  const [filterInitialDate, setFilterInitialDate] = useState("");
  const [filterFinalDate, setFilterFinalDate] = useState("");
  const salesCopy = useCustomSelector((state) => state.profit.salesCopy);

  const getSalesTodayHandler = async () => {
    const data = await getSalesToday();
    dispatch(addSales({ sales: data }));
    dispatch(addSalesCopy({ salesCopy: data }));
  };

  const searchByClienIdHandle = async () => {
    const data = await getSaleByClientId(inputId);
    dispatch(addSales({ sales: data }));
    dispatch(addSalesCopy({ salesCopy: data }));
  };

  const searchBySaleIdHandle = async () => {
    const data = await getSaleBySaleId(inputId);
    dispatch(addSales({ sales: data }));
    dispatch(addSalesCopy({ salesCopy: data }));
  };

  const searchByDateHandle = async () => {
    const data = await getSalesByDate(filterInitialDate, filterFinalDate);
    dispatch(addSales({ sales: data }));
    dispatch(addSalesCopy({ salesCopy: data }));
  };

  const filterByBillTypeSalesHandle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterBillTypeSales(event.target.checked);

    const filteredProducts = sales.filter((sale) => {
      const matchSales =
        filterByBillTypeSales === false || sale.movementType !== "Venta";
      const matchPayments =
        filterByBillTypePayment == true || sale.movementType !== "Abono";
      const matchCash = filterCash == true || sale.paymentType !== "Efectivo";
      const matchTransaction =
        filterTransaction == true || sale.paymentType !== "Transaccion";
      const matchMix = filterMix == true || sale.paymentType !== "Mixto";

      return (
        matchSales && matchPayments && matchCash && matchTransaction && matchMix
      );
    });

    dispatch(addSalesCopy({ salesCopy: filteredProducts }));
  };

  const filterByBillTypePaymentHandle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterBillTypePayment(event.target.checked);
    const filteredProducts = sales.filter((sale) => {
      const matchSales =
        filterByBillTypeSales === true || sale.movementType !== "Venta";
      const matchPayments =
        filterByBillTypePayment == false || sale.movementType !== "Abono";
      const matchCash = filterCash == true || sale.paymentType !== "Efectivo";
      const matchTransaction =
        filterTransaction == true || sale.paymentType !== "Transaccion";
      const matchMix = filterMix == true || sale.paymentType !== "Mixto";

      return (
        matchSales && matchPayments && matchCash && matchTransaction && matchMix
      );
    });

    dispatch(addSalesCopy({ salesCopy: filteredProducts }));
  };

  const filterByPayTypeCashHandle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    setFilterCash(checked);
    const filteredProducts = sales.filter((sale) => {
      const matchSales =
        filterByBillTypeSales === true || sale.movementType !== "Venta";
      const matchPayments =
        filterByBillTypePayment == true || sale.movementType !== "Abono";
      const matchCash = filterCash == false || sale.paymentType !== "Efectivo";
      const matchTransaction =
        filterTransaction == true || sale.paymentType !== "Transaccion";
      const matchMix = filterMix == true || sale.paymentType !== "Mixto";

      return (
        matchSales && matchPayments && matchCash && matchTransaction && matchMix
      );
    });

    dispatch(addSalesCopy({ salesCopy: filteredProducts }));
  };

  const filterByPayTypeTransaHandle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    setFilterTransaction(checked);
    const filteredProducts = sales.filter((sale) => {
      const matchSales =
        filterByBillTypeSales === true || sale.movementType !== "Venta";
      const matchPayments =
        filterByBillTypePayment == true || sale.movementType !== "Abono";
      const matchCash = filterCash == true || sale.paymentType !== "Efectivo";
      const matchTransaction =
        filterTransaction == false || sale.paymentType !== "Transaccion";
      const matchMix = filterMix == true || sale.paymentType !== "Mixto";

      return (
        matchSales && matchPayments && matchCash && matchTransaction && matchMix
      );
    });

    dispatch(addSalesCopy({ salesCopy: filteredProducts }));
  };

  const filterByPayTypeMixHandle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    setFilterMix(checked);
    const filteredProducts = sales.filter((sale) => {
      const matchSales =
        filterByBillTypeSales === true || sale.movementType !== "Venta";
      const matchPayments =
        filterByBillTypePayment == true || sale.movementType !== "Abono";
      const matchCash = filterCash == true || sale.paymentType !== "Efectivo";
      const matchTransaction =
        filterTransaction == true || sale.paymentType !== "Transaccion";
      const matchMix = filterMix == false || sale.paymentType !== "Mixto";

      return (
        matchSales && matchPayments && matchCash && matchTransaction && matchMix
      );
    });

    dispatch(addSalesCopy({ salesCopy: filteredProducts }));
  };

  interface IndexArrayData {
    time: string;
    value: number;
  }

  const calculateTotal = () => {
    let total = 0;
    let totalSpent = 0;
    let totalCash = 0;
    let totalTrans = 0;
    let grahpArrayData: IndexArrayData[] = [];

    salesCopy.forEach((sale) => {
      total += sale.total;
      totalSpent += sale.valueSpent;
      totalCash += sale.valueCash;
      totalTrans += sale.valueTransaction;

      const formattedDateCreate = new Date(sale.createdAt);
      const year = formattedDateCreate.getFullYear();
      const month = String(formattedDateCreate.getMonth() + 1).padStart(2, "0"); // Los meses son base 0 en JavaScript
      const day = String(formattedDateCreate.getDate()).padStart(2, "0");
      const formatedToChartDate = `${year}-${month}-${day}`;

      const objectData = {
        time: formatedToChartDate,
        value: total - totalSpent,
      };

      grahpArrayData.push(objectData);
    });

    // Ordenar grahpArrayData según la fecha y eliminar duplicados
    grahpArrayData.sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );
    grahpArrayData = grahpArrayData.filter(
      (item, index, self) => index === 0 || item.time !== self[index - 1].time
    );

    const totals = {
      total: total,
      totalSpent: totalSpent,
      totalCash: totalCash,
      totalTrans: totalTrans,
      grahpArrayData: grahpArrayData,
    };

    return totals;
  };
  useEffect(() => {
    getSalesTodayHandler();
  }, []);

  const sortByCreationDate = (event: React.MouseEvent<HTMLHRElement>) => {
    event.preventDefault();
    if (typeSort == "creationDateSort") {
      setTypeSort("");
      const arraySorted = [...salesCopy].sort((a: Sales, b: Sales) =>
        b.createdAt?.localeCompare(a.createdAt)
      );
      dispatch(addSalesCopy({ salesCopy: arraySorted }));
      return;
    }
    setTypeSort("creationDateSort");
    const arraySorted = [...salesCopy].sort((a: Sales, b: Sales) =>
      a.createdAt?.localeCompare(b.createdAt)
    );
    dispatch(addSalesCopy({ salesCopy: arraySorted }));
  };

  return (
    <div className={style.principalContainer}>
      <div className={style.searchContainer}>
        <div
          className={`${style.optionContainer} ${style.optionContainer__search} `}
        >
          <input
            type="text"
            id="inputSaleId"
            placeholder="Buscar Factura"
            className={style.optionContainer__input}
            onChange={(e) => setInputId(e.target.value)}
          />
          <div className={style.buttonsContainer}>
            <button
              className={style.principalContainer__btn}
              onClick={searchByClienIdHandle}
            >
              Buscar por ID cliente
            </button>
            <button
              className={style.principalContainer__btn}
              onClick={searchBySaleIdHandle}
            >
              Buscar por ID factura
            </button>
          </div>
        </div>
        <div className={style.optionContainer}>
          <h3 className={style.optionContainer__h3}>Fecha de factura:</h3>
          <div className={style.inputContainer}>
            <label htmlFor="desdeDate" className={style.inputContainer__label}>
              Desde:
            </label>
            <input
              type="date"
              name=""
              id="desdeDate"
              className={style.inputContainer__input}
              onChange={(e) => setFilterInitialDate(e.target.value)}
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
            Buscar por Fecha
          </button>
        </div>
        <div className={style.optionContainer}>
          <h3 className={style.optionContainer__h3}>Tipo de factura:</h3>

          <div className={style.inputContainer}>
            <label htmlFor="saleRadio" className={style.inputContainer__label}>
              Ventas
            </label>
            <input
              checked={filterByBillTypeSales}
              onChange={filterByBillTypeSalesHandle}
              type="checkbox"
              name="optionRadio"
              id="saleRadio"
              className={style.inputContainer__input_chk}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="payment" className={style.inputContainer__label}>
              Abonos
            </label>
            <input
              onChange={filterByBillTypePaymentHandle}
              checked={filterByBillTypePayment}
              type="checkbox"
              name="optionRadio"
              id="payment"
              className={style.inputContainer__input_chk}
            />
          </div>
        </div>
        <div className={style.optionContainer}>
          <h3 className={style.optionContainer__h3}>Tipo de pago:</h3>
          <div className={style.inputContainer}>
            <label htmlFor="cash" className={style.inputContainer__label}>
              Efectivo
            </label>
            <input
              onChange={filterByPayTypeCashHandle}
              checked={filterCash}
              type="checkbox"
              name="optionCheck"
              id="cash"
              className={style.inputContainer__input_chk}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="trans" className={style.inputContainer__label}>
              Transaccion
            </label>
            <input
              onChange={filterByPayTypeTransaHandle}
              checked={filterTransaction}
              type="checkbox"
              name="optionCheck"
              id="trans"
              className={style.inputContainer__input_chk}
            />
          </div>
          <div className={style.inputContainer}>
            <label htmlFor="mix" className={style.inputContainer__label}>
              Mixto
            </label>
            <input
              onChange={filterByPayTypeMixHandle}
              checked={filterMix}
              type="checkbox"
              name="optionCheck"
              id="mix"
              className={style.inputContainer__input_chk}
            />
          </div>
        </div>
      </div>
      <div className={style.titleContainer}>
        <h3 className={style.titleContainer__h3}>Id:</h3>
        <h3 className={style.titleContainer__h3}>Cliente:</h3>
        <h3 className={style.titleContainer__h3}>Descripcion:</h3>
        <h3 className={style.titleContainer__h3}>Tipo de pago:</h3>
        <h3 className={style.titleContainer__h3} onClick={sortByCreationDate}>
          Fecha:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "creationDateSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>
          Valor Efectivo:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "maximumSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>
          Valor Transferencia:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "creationDateSort" ? "▼" : "▶"}
          </span>
        </h3>
        <h3 className={style.titleContainer__h3}>
          Total:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "lastVolumeDateSort" ? "▼" : "▶"}
          </span>
        </h3>

        <h3 className={style.titleContainer__h3}>Acciones:</h3>
      </div>
      <TableProfit />
      <TotalFooter totals={calculateTotal()} />
    </div>
  );
}
