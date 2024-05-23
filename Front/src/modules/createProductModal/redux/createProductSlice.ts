import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSuppliers = createAsyncThunk(
  "createProduct/getSuppliers",
  async () => {
    const response = await axios.get("/suplier");
    return response.data;
  }
);

export const getTypes = createAsyncThunk("createProduct/getTypes", async () => {
  const response = await axios.get("/type");
  return response.data;
});

interface suppliers {
  adviser: string;
  tel: string;
  company: string;
  id: string;
}
interface types {
  id: string;
  name: string;
}

interface createProductState {
  suppliers: suppliers[];
  types: types[];
}

const initialState: createProductState = {
  suppliers: [],
  types: [],
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
    {
      builder.addCase(getTypes.fulfilled, (state, action) => {
        state.types = action.payload;
      });
    } // Manejar otros estados del thunk si es necesario
  },
});

export default createProductSlice.reducer;
