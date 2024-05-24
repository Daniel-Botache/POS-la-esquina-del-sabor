import ViewAuth from "./modules/auth/components/ViewAuth";
import Footer from "./modules/footer/components/Footer";
import Home from "./modules/home/components/Home";
import NavBarLeft from "./modules/navBarLeft/components/NavBarLeft";
import Sales from "./modules/sales/components/Sales";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "https://pos-la-esquina-del-sabor.onrender.com";
import Head from "./modules/head/components/Head";

function App() {
  return (
    <>
      <Head />
      <NavBarLeft />
      <Routes>
        <Route path="/" element={<ViewAuth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sales" element={<Sales />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
