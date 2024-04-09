import { Sequelize, DataTypes } from "sequelize";
import { CreditInstance } from "../../../domain/models/CreditAttributes";

export default (sequelize: Sequelize) => {
  return sequelize.define<CreditInstance>("Credit", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    quota: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Regular",
    },
  });
};
