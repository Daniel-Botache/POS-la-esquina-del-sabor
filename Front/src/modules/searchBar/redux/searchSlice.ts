import { createSlice } from "@reduxjs/toolkit";

export interface searchProductState {
  searchProductByName: [];
  searchProductByBar: {};
}

const initialState: searchProductState = {
  searchProductByBar: {},
  searchProductByName: [],
};

const searchSlice = createSlice({
  name: "searchProduct",
  initialState,
  reducers: {
    getProductByName: (state, action) => {
      state.searchProductByName = action.payload.searchProductByName;
    },
    getProductByBar: (state, action) => {
      state.searchProductByBar = action.payload.searchProductByBar;
    },
  },
});

export default searchSlice.reducer;
export const { getProductByName, getProductByBar } = searchSlice.actions;
