import { Model, Optional } from "sequelize";

interface BaleAttributes {
  id: string;
  name: string;
  volume: number;
  maximum: number;
  barCode: string;
  price: number;
  individualQuanty: number;
  img: string;
  spent: boolean;
  bale: boolean;
  lastVolumeDate: Date;
  isFavorite: boolean;
}
interface BaleCreationAttributes extends Optional<BaleAttributes, "barCode"> {}

export interface BaleInstance
  extends Model<BaleAttributes, BaleCreationAttributes>,
    BaleAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
