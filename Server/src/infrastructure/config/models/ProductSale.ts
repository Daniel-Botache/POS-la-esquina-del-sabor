import { Sequelize, DataTypes } from "sequelize";
import { ProductSaleInstance } from "../../../domain/models/ProductSaleAttributes";

export default (sequelize: Sequelize) => {
  return sequelize.define<ProductSaleInstance>("ProductSale", {
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Products",
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
