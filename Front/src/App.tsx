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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
