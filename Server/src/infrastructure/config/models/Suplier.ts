import { SuplierInstance } from "../../../domain/models/SuplierAttributes";
import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
  return sequelize.define<SuplierInstance>("Suplier", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    adviser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
