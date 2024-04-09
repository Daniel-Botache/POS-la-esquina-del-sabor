"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize) => {
    return sequelize.define("Client", {
        id: {
            type: sequelize_1.DataTypes.UUID,
            primaryKey: true,
        },
        cedula: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        tel: { type: sequelize_1.DataTypes.STRING, allowNull: false },
        address: { type: sequelize_1.DataTypes.STRING, allowNull: true },
        ban: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        dateIn: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: false,
        },
    });
};
