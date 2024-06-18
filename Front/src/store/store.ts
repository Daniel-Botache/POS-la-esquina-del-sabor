import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/redux/authSlice";
import searchReducer from "../modules/searchBar/redux/searchSlice";
import billReducer from "../modules/sales/redux/billSlice";
import stockReducer from "../modules/Inventory/redux/stockSlice";
import createProductReducer from "../modules/createProductModal/redux/createProductSlice";
import profitReducer from "../modules/profit/redux/profitSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//configuracion para peristir el reducer en el localstorage
const persistCreateProductConfig = {
  key: "createProduct",
  storage,
  whitelist: ["suppliers"],
};
const persistStockConfig = {
  key: "Stock",
  storage,
  whitelist: ["deleted"],
};

const peristAuthConfig = {
  key: "auth",
  storage,
  whitelist: ["userId", "admin", "user", "access"],
};

const peristSearchConfig = {
  key: "search",
  storage,
  whitelist: ["searchProductByName", "searchProductByBar"],
};
const peristBillConfig = {
  key: "bill",
  storage,
  whitelist: ["products"],
};
const persistProfitConfig = {
  key: "profit",
  storage,
  whitelist: ["sales"],
};

//store donde se van a comunicar los reducer, se hace una key con la configuracion de persistencia y
//se le pasa como segundo argumento el reducer
export const store = configureStore({
  reducer: {
    auth: persistReducer<ReturnType<typeof authReducer>>(
      peristAuthConfig,
      authReducer
    ),
    search: persistReducer<ReturnType<typeof searchReducer>>(
      peristSearchConfig,
      searchReducer
    ),
    bill: persistReducer<ReturnType<typeof billReducer>>(
      peristBillConfig,
      billReducer
    ),
    stock: persistReducer<ReturnType<typeof stockReducer>>(
      persistStockConfig,
      stockReducer
    ),
    createProduct: persistReducer<ReturnType<typeof createProductReducer>>(
      persistCreateProductConfig,
      createProductReducer
    ),
    profit: persistReducer<ReturnType<typeof profitReducer>>(
      persistProfitConfig,
      profitReducer
    ),
  },
  middleware: (DefaultSerializer) =>
    DefaultSerializer({
      serializableCheck: false,
    }),
});

//configuracion para persistir la store en el localstorage, se utiliza el modulo redux-persist
export const perisStore = persistStore(store);

//tipos para el estado y el dispatch, se hacen mediante inferencia
export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
export default store;
