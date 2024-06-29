import { createSlice } from "@reduxjs/toolkit";

type Products = {
  id: number;
  name: string;
  volume: number;
  maximum: number;
  barCode: string;
  price: number;
  spent: boolean;
  img: string;
  lastVolumeDate: Date;
  createdAt: Date;
  updatedAt: Date;
  typeId: string;
};
type Bales = {
  id: number;
  name: string;
  volume: number;
  maximum: number;
  individualQuanty: number;
  barCode: string;
  price: number;
  spent: boolean;
  img: string;
  lastVolumeDate: Date;
  createdAt: Date;
  updatedAt: Date;
  productId: number;
  bale: boolean;
};

export interface Sales {
  id: number;
  paymentType: string;
  movementType: string;
  total: number;
  credit: boolean;
  clientId: string | null;
  valueCash: number;
  valueTransaction: number;
  createdAt: string;
  updatedAt: Date;
  userId: string;
  products: Products[];
  bales: Bales[];
  valueSpent: number;
}

export interface profitState {
  sales: Sales[];
  salesCopy: Sales[];
}
const initialState: profitState = {
  sales: [],
  salesCopy: [],
};

const profitSlice = createSlice({
  name: "Profit",
  initialState,
  reducers: {
    addSales: (state, action) => {
      state.sales = action.payload.sales;
    },
    addSalesCopy: (state, action) => {
      state.salesCopy = action.payload.salesCopy;
    },
  },
});
export default profitSlice.reducer;
export const { addSales, addSalesCopy } = profitSlice.actions;
