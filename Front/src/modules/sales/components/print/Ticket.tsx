import { forwardRef } from "react";
import style from "../../styles/Ticket.module.css";

interface TicketProps {
  products: any;
  total: number;
  clientIdStatus: string;
  userId: string;
  history: boolean;
}

const Ticket = forwardRef<HTMLDivElement, TicketProps>(
  ({ products, total, clientIdStatus, userId, history }, ref) => {
    console.log(products);
    return (
      <div className={style.ticket} ref={ref}>
        <h1>Ticket de Compra</h1>
        <p>Cliente: {clientIdStatus}</p>
        <p>Usuario: {userId}</p>

        <div className={style.products}>
          {Object.entries(products).map(([productId, productData]: any) => (
            <div key={productId} className={style.product}>
              <span>{productData.name}</span>
              <span>
                {history
                  ? productData.bale
                    ? productData.BaleSale.quantity
                    : productData.ProductSale.quantity
                  : productData.quantity}{" "}
                x ${productData.price}
              </span>
              <span>
                Total: $
                {productData.price *
                  (history
                    ? productData.bale
                      ? productData.BaleSale.quantity
                      : productData.ProductSale.quantity
                    : productData.quantity)}
              </span>
            </div>
          ))}
        </div>
        <h2>Total: ${total}</h2>
      </div>
    );
  }
);

export default Ticket;
