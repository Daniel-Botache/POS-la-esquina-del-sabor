import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSuppliers = createAsyncThunk(
  "createProduct/getSuppliers",
  async () => {
    const response = await axios.get("/suplier");
    return response.data;
  }
);

interface suppliers {
  adviser: string;
  tel: string;
  company: string;
  id: string;
}

interface createProductState {
  suppliers: suppliers[];
}

const initialState: createProductState = {
  suppliers: [],
};

const createProductSlice = createSlice({
  name: "createProduct",
  initialState,
  reducers: {
    // Aquí irían tus reducers síncronos
  },
  extraReducers: (builder) => {
    builder.addCase(getSuppliers.fulfilled, (state, action) => {
      state.suppliers = action.payload;
    });
    // Manejar otros estados del thunk si es necesario
  },
});

export default createProductSlice.reducer;
