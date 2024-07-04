import { createSlice } from "@reduxjs/toolkit";

export interface Expenses {
  id: number;
  type: string;
  suplierId: string;
  description: string;
  createdAt: Date;
  total: number;
  userId: string;
}

export interface spentState {
  expenses: Expenses[];
  expensesCopy: Expenses[];
}

const initialState: spentState = {
  expenses: [],
  expensesCopy: [],
};

const spentSlice = createSlice({
  name: "Spent",
  initialState,
  reducers: {
    addExpenses: (state, action) => {
      state.expenses = action.payload.expenses;
    },
    addExpensesCopy: (state, action) => {
      state.expensesCopy = action.payload.expensesCopy;
    },
  },
});

export default spentSlice.reducer;
export const { addExpenses, addExpensesCopy } = spentSlice.actions;
