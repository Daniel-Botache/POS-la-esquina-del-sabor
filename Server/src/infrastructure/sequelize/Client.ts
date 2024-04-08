import { ClientInstance } from "../../domain/models/ClientAtrributes";
import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
  return sequelize.define<ClientInstance>("Client", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    cedula: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
      allowNull: false,
      defaultValue: false,
    },
  });
};
