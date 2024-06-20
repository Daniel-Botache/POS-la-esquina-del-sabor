import style from "../styles/ProfitDetail.module.css";
import CellList from "../../sales/components/billSide/CellList";

type ProfitDetailProps = {
  id: number;
  paymentType: string;
  movementType: string;
  clientId: string;
  createdAt: Date;
  valueTransaction: number;
  valueCash: number;
  total: number;
  products: [];
  bales: [];
};

export default function ProfitDetail({
  id,
  paymentType,
  movementType,
  clientId,
  createdAt,
  valueTransaction,
  valueCash,
  total,
  products,
  bales,
}: ProfitDetailProps) {
  return (
    <div className={style.principalContainer}>
      <div className={style.titleContainer}>
        <h1 className={style.titleContainer__h1}>Factura: {id}</h1>
        <div className={style.clientContainer}>
          <h4 className={style.principalContainer__h4}>Cliente: {clientId}</h4>
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
            {Object.entries(products).map(([productId, productData]) => (
              <CellList
                key={productId}
                id={productId}
                barCode={productData.barCode}
                productName={productData.name}
                quantity={productData.quantity}
                price={productData.price}
                total={productData.price * productData.quantity}
              />
            ))}

            <button className={style.billProductContainer__btn}>
              <DeleteIcon className={style.billProductContainer__icon} />
            </button>
          </div>
        </div>
        <div style={{ display: "none" }}>
          <Ticket
            ref={ticketRef}
            products={productsSelected}
            total={total}
            clientIdStatus={clientIdStatus}
            userId={userId}
          />
        </div>
      </div>
    </div>
  );
}
