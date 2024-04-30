export default function validate(input: any) {
  let errors: { user: string; password: string } = {
    user: "",
    password: "",
  };
  if (!input.user.trim()) {
    errors.user = "Ingrese un usuario";
  }
  if (!input.password.trim()) {
    errors.password = "Debe ingresar una contraseña";
  } else if (input.password.lengh < 6) {
    errors.password =
      "La contraseña debe contener minimo 6 caracteres y un numero";
  }
}
