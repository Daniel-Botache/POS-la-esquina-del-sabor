import { Model, Optional } from "sequelize";

interface BaleSaleAttributes {
  baleId: number;
  saleId: number;
  quantity: number;
}

interface BaleSaleCreationAttributes
  extends Optional<BaleSaleAttributes, "quantity"> {}

export interface BaleSaleInstance
  extends Model<BaleSaleAttributes, BaleSaleCreationAttributes>,
    BaleSaleAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
