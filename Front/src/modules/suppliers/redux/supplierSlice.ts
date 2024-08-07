import { createSlice } from "@reduxjs/toolkit";

export type Supplier = {
  id: string;
  company: string;
  tel: string;
  adviser: string;
  createdAt: Date;
};

interface SupplierState {
  suppliers: Supplier[];
  suppliersCopy: Supplier[];
}

const initialState: SupplierState = {
  suppliers: [],
  suppliersCopy: [],
};

const supplierSlice = createSlice({
  name: "searchSupplier",
  initialState,
  reducers: {
    addSupplier: (state, action) => {
      state.suppliers = action.payload.suppliers;
    },
    addSupplierCopy: (state, action) => {
      state.suppliersCopy = action.payload.suppliersCopy;
    },
  },
});

export default supplierSlice.reducer;
export const { addSupplier, addSupplierCopy } = supplierSlice.actions;
