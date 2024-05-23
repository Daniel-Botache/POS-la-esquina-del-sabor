import { Model, Optional } from "sequelize";

export interface TypeAttributes {
  id?: string;
  name: string;
}
interface TypeCreationAttributes extends Optional<TypeAttributes, "id"> {}

export interface TypeInstance
  extends Model<TypeAttributes, TypeCreationAttributes>,
    TypeAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
