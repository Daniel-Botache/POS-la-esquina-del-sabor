import { Model, Optional } from "sequelize";
import { ProductInstance } from "./ProductAttributes";
interface SaleAttributes {
  id: string;
  total: number;
  paymentType: string;
  movementType: string;
  credit: boolean;
  clientId: number;
  valueCash: number;
  valueTransaction: number;
}
interface SaleCreationAttributes extends Optional<SaleAttributes, "id"> {}

export interface SaleInstance
  extends Model<SaleAttributes, SaleCreationAttributes>,
    SaleAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  addProducts?: (
    products: ProductInstance[] | ProductInstance
  ) => Promise<void>;
  addBales?: (products: ProductInstance[] | ProductInstance) => Promise<void>;
}
