import { ClientInstance } from "./interfaces/ClientAtrributes";
import { Sequelize, DataTypes, INTEGER } from "sequelize";

export default (sequelize: Sequelize) => {
  return sequelize.define<ClientInstance>("Client", {
    id: {
      type: INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    tel: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: true },
    ban: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    dateIn: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: false,
    },
  });
};
