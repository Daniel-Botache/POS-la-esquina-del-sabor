import { sequelize } from "./infrastructure/config/database";
import { app } from "./infrastructure/config/app";
import axios from "axios";
import "dotenv/config";
// access to PORT from .env file
const PORT_ENV: string | undefined = process.env.PORT;

//Assign 3000 as default value in case PORT_ENV is undefined
const PORT = parseInt(PORT_ENV || "3000", 10);

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    axios
      .post("http://localhost:" + PORT + "/user", {
        user: "admin",
        password: "admin123",
        admin: true,
      })
      .then((response) => {
        console.log("Petición POST a /user realizada con éxito", response.data);
      })
      .catch((error) => {
        console.error("Error al realizar la petición POST a /user", error);
      });
    // PORT variable used to access the server
    console.log(`server running on port ${PORT}`);
  });
});
