"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./infrastructure/config/database");
const app_1 = require("./infrastructure/config/app");
require("dotenv/config");
// access to PORT from .env file
const PORT_ENV = process.env.PORT;
//Assign 3000 as default value in case PORT_ENV is undefined
const PORT = parseInt(PORT_ENV || "3000", 10);
database_1.sequelize.sync({ alter: true }).then(() => {
    app_1.app.listen(PORT, () => {
        // PORT variable used to access the server
        console.log(`server running on port ${PORT}`);
    });
});
