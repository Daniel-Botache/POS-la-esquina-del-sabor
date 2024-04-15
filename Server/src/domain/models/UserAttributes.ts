import { Model, Optional } from "sequelize";

interface UserAttributes {
  id: string;
  user: string;
  password: string;
  admin: boolean;
  ban: boolean;
}
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
