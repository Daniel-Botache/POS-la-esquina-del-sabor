import { Model, Optional } from "sequelize";
import { SuplierInstance } from "./SuplierAttributes";

interface ProductAttributes {
  id: string;
  name: string;
  volume: number;
  maximum: number;
  barCode: string;
  price: number;
  spent: boolean;
  img: string;
  lastVolumeDate: Date;
}

interface ProductCreationAttributes
  extends Optional<ProductAttributes, "barCode"> {}

export interface ProductInstance
  extends Model<ProductAttributes, ProductCreationAttributes>,
    ProductAttributes {
  createdAt?: Date;
  updatedAt?: Date;
  addSupliers?: (
    supliers: SuplierInstance[] | SuplierInstance
  ) => Promise<void>;
}
