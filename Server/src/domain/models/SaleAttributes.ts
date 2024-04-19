import { Model, Optional } from "sequelize";
interface SaleAttributes {
  id: string;
  total: number;
  date: Date;
  paymentType: string;
  movementType: string;
  credit: boolean;
  products: [];
}
interface SaleCreationAttributes extends Optional<SaleAttributes, "products"> {}

export interface SaleInstance
  extends Model<SaleAttributes, SaleCreationAttributes>,
    SaleAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
