import style from "../styles/ProfitDetail.module.css";
import CellList from "../../sales/components/billSide/CellList";
import Ticket from "../../sales/components/print/Ticket";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

type Products = {
  id: string;
  name: string;
  price: number;
  barCode: string;
  ProductSale: {
    productId: string;
    quantity: number;
    saleId: string;
  };
};

type ProfitDetailProps = {
  id: number;
  movementType: string;
  clientId: string;
  createdAt: Date;
  total: number;
  products: Products[];
  bales: [];
  closeModal: () => void;
};

export default function ProfitDetail({
  id,
  clientId,
  createdAt,
  total,
  products,
  bales,
  closeModal,
}: ProfitDetailProps) {
  const ticketRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => ticketRef.current,
  });
  const formattedDateCreate = new Date(createdAt).toLocaleString();

  return (
    <div className={style.modalOverlay}>
      <div className={style.principalContainer}>
        <div className={style.closeButtonContainer}>
          <button onClick={closeModal} className={style.closeButton}>
            X
          </button>
        </div>
        <div className={style.titleContainer}>
          <h1 className={style.titleContainer__h1}>Factura: {id}</h1>
          <h1 className={style.titleContainer__h1}>{formattedDateCreate}</h1>
          <div className={style.clientContainer}>
            <h4 className={style.principalContainer__h4}>
              Cliente: {clientId}
            </h4>
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
            {products.map((product) => (
              <CellList
                key={product.id}
                id={product.id}
                barCode={product.barCode}
                productName={product.name}
                quantity={product.ProductSale.quantity}
                price={product.price}
                total={product.price * product.ProductSale.quantity}
              />
            ))}
          </div>
        </div>
        <div style={{ display: "none" }}>
          <Ticket
            ref={ticketRef}
            products={products}
            total={total}
            clientIdStatus={clientId}
            userId={"000"}
          />
        </div>
        <div className={style.closeSaleContainer}>
          <h3
            className={`${style.closeSaleContainer__h3} ${style.closeSaleContainer__h3_title}`}
          >
            Imprimir Factura
          </h3>
          <h3 className={style.closeSaleContainer__h3}>
            Total:{" "}
            <span className={style.closeSaleContainer__span}>
              {" "}
              {new Intl.NumberFormat("es-CO").format(total)}
            </span>
          </h3>
        </div>
      </div>
    </div>
  );
}
