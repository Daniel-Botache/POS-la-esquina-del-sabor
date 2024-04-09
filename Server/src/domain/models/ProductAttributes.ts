import { Model, Optional } from "sequelize";

interface ProductAttributes {
  id: string;
  name: string;
  type: string;
  volume: number;
  maximum: number;
  barCode: string;
  price: number;
  spent: boolean;
}

interface ProductCreationAttributes
  extends Optional<ProductAttributes, "barCode"> {}

export interface ProductInstance
  extends Model<ProductAttributes, ProductCreationAttributes>,
    ProductAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
