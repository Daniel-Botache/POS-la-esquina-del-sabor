import { createSlice } from "@reduxjs/toolkit";

export type Client = {
  id: number;
  name: string;
  tel: string;
  address: string;
  ban: boolean;
  quotaMax: number;
  clientType: string;
  remainingCuota: number;
  lastPayment: string | null;
  createdAt: string;
  updatedAt: string;
};

interface ClientState {
  clients: Client[];
  clientsCopy: Client[];
}

const initialState: ClientState = {
  clients: [],
  clientsCopy: [],
};

const clientSlice = createSlice({
  name: "searchClient",
  initialState,
  reducers: {
    addClient: (state, action) => {
      state.clients = action.payload.clients;
    },
    addClientCopy: (state, action) => {
      state.clientsCopy = action.payload.clientsCopy;
    },
  },
});

export default clientSlice.reducer;
export const { addClient, addClientCopy } = clientSlice.actions;
