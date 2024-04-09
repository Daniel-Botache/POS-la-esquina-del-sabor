import { Model } from "sequelize";

interface SaleAttribute {
  id: string;
  total: number;
  date: Date;
  paymentType: string;
  movementType: string;
  credit: boolean;
}
export interface SaleInstance extends Model<SaleAttribute> {
  createdAt?: Date;
  updatedAt?: Date;
}
