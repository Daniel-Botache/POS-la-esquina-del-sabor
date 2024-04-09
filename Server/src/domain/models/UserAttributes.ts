import { Model } from "sequelize";

interface UserAttributes {
  id: string;
  user: string;
  password: string;
  admin: boolean;
  ban: boolean;
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
