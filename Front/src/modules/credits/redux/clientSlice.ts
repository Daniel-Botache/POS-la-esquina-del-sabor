import { createSlice } from "@reduxjs/toolkit";

export type Client = {
  id: string;
  name: string;
  tel: string;
  address: string;
  ban: boolean;
  quotaMax: number;
  clientType: string;
  remainingQuota: number;
  lastPayment: string | null;
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
