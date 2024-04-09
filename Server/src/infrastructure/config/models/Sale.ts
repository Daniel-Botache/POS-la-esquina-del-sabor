import { Sequelize, DataTypes } from "sequelize";
import { SaleInstance } from "../../../domain/models/SaleAttributes";
import Credit from "./Credit";

export default (sequelize: Sequelize) => {
  return sequelize.define<SaleInstance>("Expense", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
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
  });
};
