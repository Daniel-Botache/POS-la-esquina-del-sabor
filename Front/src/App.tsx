import SignUpForm from "./modules/auth/components/SignUpForm";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
      </Routes>
    </>
  );
}

export default App;
