import style from "../styles/Bases.module.css";
import { useEffect, useState } from "react";
import { SearchIcon, AddIcon } from "../../../utils/Icons/icons";
import CreateBaseModal from "./CreateBaseModal";
import { getEBasesToday } from "../services/getBasesToday";
import TableBase from "./TableBase";
import { getBasesByDate } from "../services/getBasesByDate";
import { Base } from "./TableBase";
import TotalFooter from "./TotalFooter";

export default function Bases() {
  const [filterInitialDate, setFilterInitialDate] = useState("");
  const [filterFinalDate, setFilterFinalDate] = useState("");

  const [createBaseModalOpen, setCreateBaseModalOpen] = useState(false);
  const [basesSearched, setBasesSearched] = useState([]);
  const [basesSearchedCopy, setBasesSearchedCopy] = useState([]);
  const [typeSort, setTypeSort] = useState("");

  const toggleModalBase = () => {
    setCreateBaseModalOpen(!createBaseModalOpen);
  };

  const sortByCreationDate = (event: React.MouseEvent<HTMLHRElement>) => {
    event.preventDefault();
    if (typeSort == "creationDateSort") {
      setTypeSort("");
      const arraySorted = [...basesSearchedCopy].sort((a: Base, b: Base) =>
        b.date?.localeCompare(a.date)
      );
      setBasesSearchedCopy(arraySorted);
      return;
    }
    setTypeSort("creationDateSort");
    const arraySorted = [...basesSearchedCopy].sort((a: Base, b: Base) =>
      a.date?.localeCompare(b.date)
    );
    setBasesSearchedCopy(arraySorted);
  };

  const sortByTotal = (event: React.MouseEvent<HTMLHRElement>) => {
    event.preventDefault();
    if (typeSort == "totalSort") {
      setTypeSort("");
      const arraySorted = [...basesSearchedCopy].sort(
        (a: Base, b: Base) => b.total - a.total
      );
      setBasesSearchedCopy(arraySorted);
      return;
    }
    setTypeSort("totalSort");
    const arraySorted = [...basesSearchedCopy].sort(
      (a: Base, b: Base) => a.total - b.total
    );
    setBasesSearchedCopy(arraySorted);
  };

  const typeSelectedHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "") {
      setBasesSearchedCopy(basesSearched);
      return;
    } else if (event.target.value == "Base") {
      const filterArrayBases = basesSearched.filter(
        (base: Base) => base.type == "Base"
      );
      setBasesSearchedCopy(filterArrayBases);
      return;
    } else if (event.target.value == "Mios") {
      const filterArrayBases = basesSearched.filter(
        (base: Base) => base.type == "Mios"
      );
      setBasesSearchedCopy(filterArrayBases);
      return;
    }
    const filterArrayBases = basesSearched.filter(
      (base: Base) => base.type == "Otro"
    );
    setBasesSearchedCopy(filterArrayBases);
    return;
  };

  const getBasesTodayHandle = async () => {
    const basesToday = await getEBasesToday();
    setBasesSearched(basesToday);
    setBasesSearchedCopy(basesToday);
  };

  const getBasesByDateHandle = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const basesByDate = await getBasesByDate(
      filterInitialDate,
      filterFinalDate
    );
    setBasesSearched(basesByDate);
    setBasesSearchedCopy(basesByDate);
  };

  useEffect(() => {
    getBasesTodayHandle();
  }, []);

  const calculateTotal = () => {
    let total = 0;

    basesSearchedCopy.forEach((base: Base) => {
      total = base.total + total;
    });

    const totals = {
      total: total,
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
            onClick={getBasesByDateHandle}
          >
            <SearchIcon className={style.principalContainer_icon} />
          </button>
        </div>
        <div className={style.optionContainer}>
          <label htmlFor="suplierInput" className={style.inputContainer__label}>
            {" "}
            Tipo de base:
          </label>
          <select
            name="suplierInput"
            id="suplierInput"
            className={style.optionContainer__select}
            onChange={typeSelectedHandle}
          >
            <option value="">Todos</option>
            <option value="Base">Base</option>
            <option value="Mios">Mios</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div className={style.headContainer__button} onClick={toggleModalBase}>
          <AddIcon className={style.headContainer__button__icon} />
          <p className={style.headContainer__button__p}>Agregar base</p>
        </div>
        {createBaseModalOpen && <CreateBaseModal onClose={toggleModalBase} />}
      </div>
      <div className={style.titleContainer}>
        <h3 className={style.titleContainer__h3} onClick={sortByCreationDate}>
          Fecha:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "creationDateSort" ? "▼" : "▶"}
          </span>
        </h3>

        <h3 className={style.titleContainer__h3}>Tipo:</h3>
        <h3 className={style.titleContainer__h3}>Observación:</h3>
        <h3 className={style.titleContainer__h3} onClick={sortByTotal}>
          Total:{" "}
          <span className={style.titleCOntainer__span}>
            {typeSort == "totalSort" ? "▼" : "▶"}
          </span>
        </h3>

        <h3 className={style.titleContainer__h3}>Usuario: </h3>
      </div>
      <TableBase bases={basesSearchedCopy} />
      <TotalFooter totals={calculateTotal()} />
    </div>
  );
}
