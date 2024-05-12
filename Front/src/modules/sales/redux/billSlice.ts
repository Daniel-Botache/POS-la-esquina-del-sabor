import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BillState {
  products: { [key: string]: ProductState };
}

interface Product {
  id: string;
  name: string;
  type: string;
  volume: number;
  maximum: number;
  barCode: string;
  price: number;
  spent: boolean;
  createdAt: Date;
  updatedAt: Date;
  suppliers: [
    id: string,
    company: string,
    tel: string,
    adviser: string,
    createdAt: Date,
    updatedAt: Date
  ];
}
export interface ProductState {
  quantity: number;
  price: number;
  name: string;
  barCode: string;
}

const initialState: BillState = {
  products: {},
};

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    addProductBill: (
      state,
      action: PayloadAction<{ product: Product; quantity: number }>
    ) => {
      const { product, quantity } = action.payload;
      const productEntry = state.products[product.id];

      if (productEntry) {
        productEntry.quantity += quantity;
      } else {
        state.products[product.id] = {
          quantity: quantity,
          price: product.price,
          name: product.name,
          barCode: product.barCode,
        };
      }
    },
  },
});

export default billSlice.reducer;
export const { addProductBill } = billSlice.actions;
