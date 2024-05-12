import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BillState {
  products: { [key: string]: number };
}

interface Product {
  id: string;
  name: string;
  type: string;
  volume: number;
  maximum: number;
  barcode: string;
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
      const currentQuantity = state.products[product.id] || 0;
      state.products[product.id] = currentQuantity + quantity;
    },
  },
});

export default billSlice.reducer;
export const { addProductBill } = billSlice.actions;
