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
    getPorductByName: (state, action) => {
      state.searchProductByName = action.payload.searchProductByName;
    },
  },
});

export default searchSlice.reducer;
export const { getPorductByName } = searchSlice.actions;
