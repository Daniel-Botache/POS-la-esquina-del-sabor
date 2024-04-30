import { useState, useEffect } from "react";
import { loginService } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { useCustomDispatch } from "../../../store/hooks/index";
import { setUserInfo } from "../redux/authSlice";
import validate from "../validations/validates";
import { errorMessage } from "../hooks/notifications";
import { succesMessage } from "../hooks/notifications";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState(false);
  const [errors, setErrors] = useState({ user: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useCustomDispatch();

  const loginHandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate({ user: username, password: password });
    setErrors(validationErrors);
    if (validationErrors.user) {
      errorMessage(validationErrors.user);
    }
    if (validationErrors.password) {
      errorMessage(validationErrors.password);
    }

    if (!validationErrors.user && !validationErrors.password) {
      try {
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
          succesMessage(`Bienvenido ${response.user}`);
        }
      } catch (error) {
        console.log(error);
        errorMessage("Error al iniciar sesión.");
      }
    }
  };

  useEffect(() => {
    if (access) {
      navigate("/home");
    }
  }, [access, navigate]);

  return (
    <div>
      <form onSubmit={loginHandleSubmit}>
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
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
