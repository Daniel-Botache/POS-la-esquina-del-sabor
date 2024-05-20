import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BillState {
  products: { [key: string]: ProductState };
  productSearched: ProductSearchedI;
}
interface ProductSearchedI {
  id: number;
  barCode: string;
  name: string;
  bale: boolean;
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
  bale: boolean;
  productId: number;
  individualQuanty: number;
}
export interface ProductState {
  quantity: number;
  price: number;
  name: string;
  barCode: string;
  volume: number;
  bale: boolean;
  productId: number;
  individualQuanty: number;
}

const initialState: BillState = {
  products: {},
  productSearched: { id: 0, name: "", bale: false, barCode: "" },
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
          volume: product.volume,
          bale: product.bale,
          productId: product.productId,
          individualQuanty: product.individualQuanty,
        };
      }
    },
    clearProductsBill: (state) => {
      state.products = {};
    },
    addProductCreateBale: (state, action) => {
      state.productSearched.id = action.payload.id;
      state.productSearched.name = action.payload.name;
      state.productSearched.bale = action.payload.bale;
      state.productSearched.barCode = action.payload.barCode;
    },
    clearProductSearched: (state) => {
      state.productSearched = { id: 0, name: "", bale: false, barCode: "" };
    },
  },
});

export default billSlice.reducer;
export const {
  addProductBill,
  clearProductsBill,
  addProductCreateBale,
  clearProductSearched,
} = billSlice.actions;
