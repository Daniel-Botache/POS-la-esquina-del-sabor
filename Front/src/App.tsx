import ViewAuth from "./modules/auth/components/ViewAuth";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ViewAuth />} />
      </Routes>
    </>
  );
}

export default App;
