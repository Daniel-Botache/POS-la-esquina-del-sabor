import { Model, Optional } from "sequelize";

interface BaseAttributes {
  id: string;
  date: Date;
  observation: string;
  type: string;
}

interface BaseCreationAttributes
  extends Optional<BaseAttributes, "observation"> {}

export interface BaseInstance
  extends Model<BaseAttributes, BaseCreationAttributes>,
    BaseAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
