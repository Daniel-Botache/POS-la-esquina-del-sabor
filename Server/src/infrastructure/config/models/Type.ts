import { TypeInstance } from "../../../domain/models/TypeAttributes";
import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
  return sequelize.define<TypeInstance>("Type", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
