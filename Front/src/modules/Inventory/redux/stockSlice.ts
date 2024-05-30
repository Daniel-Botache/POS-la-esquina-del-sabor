import { createSlice } from "@reduxjs/toolkit";

export interface StockSate {
  deleted: boolean;
}
const initialState: StockSate = {
  deleted: false,
};

const stockSlice = createSlice({
  name: "Stock",
  initialState,
  reducers: {
    changeDeleteStatus: (state) => {
      state.deleted = !state.deleted;
    },
  },
});

export default stockSlice.reducer;
export const { changeDeleteStatus } = stockSlice.actions;
