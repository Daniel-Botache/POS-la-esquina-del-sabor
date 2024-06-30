import { Sequelize, DataTypes } from "sequelize";
import { ExpenseInstance } from "../../../domain/models/ExpenseAttributes";

export default (sequelize: Sequelize) => {
  return sequelize.define<ExpenseInstance>("Expense", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM("Nomina", "Pago proveedor", "Pago externo"),
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
