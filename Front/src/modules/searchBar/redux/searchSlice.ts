import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
    getPorductByName: (name, action) => {},
  },
});
