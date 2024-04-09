import { UserInstance } from "../../../domain/models/UserAttributes";
import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
  return sequelize.define<UserInstance>("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ban: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });
};
