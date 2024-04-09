import { Sequelize, DataTypes } from "sequelize";
import { ExpenseInstance } from "../../../domain/models/ExpenseAttributes";

export default (sequelize: Sequelize) => {
  return sequelize.define<ExpenseInstance>("Expense", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
