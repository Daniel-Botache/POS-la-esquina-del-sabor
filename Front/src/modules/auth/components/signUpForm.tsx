import { useState, useEffect } from "react";
import { loginService } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { useCustomDispatch } from "../../../store/hooks/index";
import { setUserInfo } from "../redux/authSlice";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useCustomDispatch();

  const loginHandleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    try {
      event.preventDefault();
      const response = await loginService(username, password);
      if (response) {
        dispatch(
          setUserInfo({
            user: response.user,
            userId: response.id,
            admin: response.admin,
          })
        );
        setAccess(true);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    !access && navigate("/");
  }, [access]);
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={loginHandleSubmit}>Entrar</button>
      </form>
    </div>
  );
}
