import ViewAuth from "./modules/auth/components/ViewAuth";
import Footer from "./modules/footer/components/Footer";
import Home from "./modules/home/components/home";
import NavBarLeft from "./modules/navBarLeft/components/navBarLeft";
import Sales from "./modules/sales/components/Sales";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";
import Head from "./modules/head/components/head";
import Stock from "./modules/Inventory/components/Stock";
import Profit from "./modules/profit/components/Profit";
import Expenses from "./modules/spents/components/Expenses";
import Bases from "./modules/dailyBases/components/Bases";
import Balance from "./modules/balance/components/Balance";
import Credits from "./modules/credits/components/Credits";
import Suppliers from "./modules/suppliers/components/Suppliers";

function App() {
  return (
    <>
      <Head />
      <NavBarLeft />
      <Routes>
        <Route path="/" element={<ViewAuth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/profit" element={<Profit />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/bases" element={<Bases />} />
        <Route path="/balance" element={<Balance />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/suppliers" element={<Suppliers />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
