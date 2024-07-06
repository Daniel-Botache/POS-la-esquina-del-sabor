import { Sequelize, DataTypes } from "sequelize";
import { BaseInstance } from "../../../domain/models/BaseAttributes";

export default (sequelize: Sequelize) => {
  return sequelize.define<BaseInstance>("Base", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
