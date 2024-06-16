import { Sequelize, DataTypes } from "sequelize";
import { SaleInstance } from "../../../domain/models/SaleAttributes";

export default (sequelize: Sequelize) => {
  return sequelize.define<SaleInstance>("Sale", {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    paymentType: {
      type: DataTypes.ENUM("Efectivo", "Transaccion", "Mixto"),
      allowNull: false,
    },
    movementType: {
      type: DataTypes.ENUM("Venta", "Abono"),
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    credit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    clientId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    valueCash: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    valueTransaction: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    valueSpent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};
