import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type Suplier = {
  id: string;
  company: string;
  tel: string;
  adviser: string;
  createdAt: Date;
  updatedAt: Date;
};

type Product = {
  id: number;
  name: string;
  supliers: Suplier[];
  volume: number;
  maximum: number;
  createdAt: string;
  updatedAt: string;
  barCode: string;
  price: number;
  img: string;
  lastVolumeDate: string;
  bale: boolean | null;
  productId: number | null;
  typeId: string;
};
export interface searchProductState {
  searchProductByName: Product[];
  searchProductByNameCopy: [];
}

const initialState: searchProductState = {
  searchProductByNameCopy: [],
  searchProductByName: [],
};

const searchSlice = createSlice({
  name: "searchProduct",
  initialState,
  reducers: {
    getProductByName: (state, action) => {
      state.searchProductByName = action.payload.searchProductByName;
    },
    getProductByBarNameCopy: (state, action) => {
      state.searchProductByNameCopy = action.payload.searchProductByNameCopy;
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const updatedProduct = action.payload;
      const index = state.searchProductByName.findIndex(
        (product) => product.id === updatedProduct.id
      );
      if (index !== -1) {
        state.searchProductByName[index] = updatedProduct;
      }
    },
  },
});

export default searchSlice.reducer;
export const { getProductByName, getProductByBarNameCopy, updateProduct } =
  searchSlice.actions;
