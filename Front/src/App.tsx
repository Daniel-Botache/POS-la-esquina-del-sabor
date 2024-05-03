import ViewAuth from "./modules/auth/components/ViewAuth";
import Footer from "./modules/footer/components/Footer";
import Home from "./modules/home/components/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";
import Head from "./modules/head/components/Head";

function App() {
  return (
    <>
      <Head />
      <Routes>
        <Route path="/" element={<ViewAuth />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
