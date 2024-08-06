import { Sequelize, DataTypes } from "sequelize";
import { BaleSaleInstance } from "../../../domain/models/BaleSaleAttributes";

export default (sequelize: Sequelize) => {
  return sequelize.define<BaleSaleInstance>("BaleSale", {
    baleId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Bales",
        key: "id",
      },
    },
    saleId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Sales",
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
};
