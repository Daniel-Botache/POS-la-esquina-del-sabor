import style from "../../styles/BillSide.module.css";
import CellList from "./CellList";
import {
  addProductBill,
  clearProductsBill,
  updateProducts,
} from "../../redux/billSlice";
import { useState, useEffect } from "react";
import { useCustomDispatch, useCustomSelector } from "../../../../store/hooks";
import { searchByBarCode } from "../../services/searchByBarCodeService";
import { errorMessage, succesMessage } from "../../../auth/hooks/notifications";
import { postSaleService } from "../../services/postSaleService";
import { putProductService } from "../../services/putProductService";
import { DeleteIcon } from "../../../../utils/Icons/icons";

export default function BillSide() {
  const [barCode, setbarCode] = useState("");
  const [transactionType, setTransactionType] = useState("Venta");
  const [totalSale, setTotalSale] = useState(0);
  const [clientIdStatus, setClientIdStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [_selectedPaymentType, setSelectedPaymentType] = useState("Efectivo");

  const dispatch = useCustomDispatch();
  const productsSelected = useCustomSelector((state) => state.bill.products);
  const userId = useCustomSelector((state) => state.auth.userId);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const updatedProducts = { ...productsSelected };
    delete updatedProducts[id];
    dispatch(updateProducts(updatedProducts));
  };

  const handleCancelSale = () => {
    const confirmCancel = confirm("¿Seguro desea cancelar la compra?");
    if (confirmCancel) {
      dispatch(clearProductsBill());
    }
  };

  const handlePaymentSelection = async (paymentType: string) => {
    setSelectedPaymentType(paymentType);
    closeModal();

    if (
      (transactionType === "Venta" &&
        Object.keys(productsSelected).length === 0) ||
      (transactionType === "Abono" && clientIdStatus === "")
    ) {
      errorMessage(
        "No se pueden procesar ventas sin productos o abonos sin cliente."
      );
      return;
    }
    const bales: string[] = [];
    const products: string[] = [];
    Object.entries(productsSelected).forEach(([key, value]) => {
      if (value.bale) {
        bales.push(key);
      } else {
        products.push(key);
      }
    });
    // Configura los datos comunes de la venta.
    const saleData = {
      total: totalSale,
      paymentType: paymentType,
      movementType: transactionType,
      credit: false, // Valor predeterminado
      clientId: clientIdStatus || null, // Usa null si clientIdStatus está vacío
      userId: userId,
      products:
        transactionType === "Venta" && products.length > 0 ? products : null,
      valueCash: 0,
      valueTransaction: 0,
      bales: transactionType === "Venta" && bales.length > 0 ? bales : null,
    };
    if (paymentType === "Efectivo") {
      saleData.valueCash = totalSale;
    } else if (paymentType === "Transaccion") {
      saleData.valueTransaction = totalSale;
    } else {
      const cashValue = prompt("Por favor ingresa el valor en efectivo");
      const cashValueConverted = Number(cashValue);
      saleData.valueCash = cashValueConverted;
      saleData.valueTransaction = totalSale - cashValueConverted;
    }
    // Maneja el caso especial de crédito.
    if (transactionType === "Venta" && clientIdStatus !== "") {
      saleData.credit = confirm("¿Es crédito?");
    }

    // Realiza la petición de post venta.
    try {
      await postSaleService(saleData);
      dispatch(clearProductsBill());
      putProductService(productsSelected);
      succesMessage(
        transactionType === "Abono"
          ? "Abono realizado con éxito"
          : "Venta realizada con éxito"
      );
    } catch (error) {
      errorMessage("Hubo un error al procesar la transacción.");
    }
  };

  const handleTransactionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (Object.keys(productsSelected).length > 0) {
      errorMessage("Debe cerrar la factura actual");
      return;
    }
    setTransactionType(value);
    if (value === "Abono") {
      const abonoValue = prompt("Por favor ingresa el valor a abonar:");
      const convertedAbono = Number(abonoValue);
      if (abonoValue && !isNaN(convertedAbono)) {
        dispatch(
          addProductBill({
            product: {
              id: "",
              name: "Abono",
              price: parseFloat(abonoValue),
              volume: 0,
              maximum: 0,
              barCode: "",
              type: "",
              spent: false,
              bale: false,
              individualQuanty: 0,
              productId: 0,
            },
            quantity: 1,
          })
        );
        return;
      }
      errorMessage("Debe ingresar solo valores numericos");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setbarCode(e.target.value);
  };
  const handleInputClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientIdStatus(e.target.value);
  };

  const handleInputEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const responseProduct = await searchByBarCode(barCode, "product");
      const reponseBale = await searchByBarCode(barCode, "bale");
      if (responseProduct) {
        dispatch(addProductBill({ product: responseProduct, quantity: 1 }));
        setbarCode("");
        return;
      }
      if (reponseBale) {
        dispatch(addProductBill({ product: reponseBale, quantity: 1 }));
        setbarCode("");
        return;
      }
      errorMessage("Datos no encontrados");
      setbarCode("");
    }
  };

  const calculateTotal = () => {
    return Object.values(productsSelected).reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };
  const calculateTotalProduct = () => {
    return Object.values(productsSelected).reduce((total, product) => {
      return total + product.quantity;
    }, 0);
  };
  useEffect(() => {
    const total = Object.values(productsSelected).reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);

    setTotalSale(total);
  }, [productsSelected]);

  const handleCloseSale = () => {
    openModal();
  };

  return (
    <div className={style.principalContainer}>
      <div className={style.titleContainer}>
        <h1 className={style.titleContainer__h1}>Factura</h1>
        <div className={style.clientContainer}>
          <h4 className={style.principalContainer__h4}>Cliente:</h4>
          <input
            onChange={handleInputClientChange}
            type="text"
            placeholder="Cédula"
            className={style.principalContainer__input}
          />
        </div>
      </div>

      <div className={style.insertProductContainer}>
        <h4 className={style.principalContainer__h4}>Cod barras:</h4>
        <input
          type="text"
          placeholder="Código"
          className={style.principalContainer__input}
          onChange={handleInputChange}
          onKeyDown={handleInputEnter}
          value={barCode}
        />
        <div>
          <label htmlFor="Abono">
            Abono
            <input
              type="radio"
              value="Abono"
              id="Abono"
              name="tipo"
              onChange={handleTransactionChange}
            />
          </label>

          <label htmlFor="Venta">
            Compra
            <input
              defaultChecked={transactionType === "Venta"}
              type="radio"
              value="Venta"
              id="Venta"
              name="tipo"
              onChange={handleTransactionChange}
            />
          </label>
        </div>
      </div>
      <div className={style.billContainer}>
        <div className={style.billTitleContainer}>
          <h3 className={style.billTitleContainer__h3}>Cod. Barras</h3>
          <h3 className={style.billTitleContainer__h3}>Producto</h3>
          <h3 className={style.billTitleContainer__h3}>Precio</h3>
          <h3 className={style.billTitleContainer__h3}>Cantidad</h3>
          <h3 className={style.billTitleContainer__h3}>Total</h3>
        </div>
        <div className={style.billProductContainer}>
          {Object.entries(productsSelected).map(([productId, productData]) => (
            <CellList
              key={productId}
              id={productId}
              barCode={productData.barCode}
              productName={productData.name}
              quantity={productData.quantity}
              price={productData.price}
              total={productData.price * productData.quantity}
              onDelete={handleDelete}
            />
          ))}

          <button className={style.billProductContainer__btn}>
            <DeleteIcon className={style.billProductContainer__icon} />
          </button>
        </div>
      </div>
      <div className={style.closeSaleContainer} onClick={handleCloseSale}>
        <h3
          className={`${style.closeSaleContainer__h3} ${style.closeSaleContainer__h3_title}`}
        >
          Cerrar Factura
        </h3>
        <h3 className={style.closeSaleContainer__h3}>
          Total:{" "}
          <span className={style.closeSaleContainer__span}>
            {" "}
            {calculateTotal()}
          </span>
        </h3>
      </div>
      {isModalOpen && (
        <div className={style.modalOverlay}>
          <div className={style.modalContent}>
            <h2>Seleccionar tipo de pago</h2>
            <button onClick={() => handlePaymentSelection("Efectivo")}>
              Efectivo
            </button>
            <button onClick={() => handlePaymentSelection("Mixto")}>
              Mixto
            </button>
            <button onClick={() => handlePaymentSelection("Transaccion")}>
              Transacción
            </button>
            <button onClick={closeModal}>Cancelar</button>
          </div>
        </div>
      )}
      <div className={style.cancelSaleContainer}>
        <p className={style.cancelSaleContainer__p}>
          {calculateTotalProduct()} Productos
        </p>
        <button
          className={style.cancelSaleContainer__btn}
          onClick={handleCancelSale}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
