import { Model, Optional } from "sequelize";

interface ProductSaleAttributes {
  productId: number;
  saleId: number;
  quantity: number;
}

interface ProductSaleCreationAttributes
  extends Optional<ProductSaleAttributes, "quantity"> {}

export interface ProductSaleInstance
  extends Model<ProductSaleAttributes, ProductSaleCreationAttributes>,
    ProductSaleAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
