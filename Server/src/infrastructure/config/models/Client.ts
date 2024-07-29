import { ClientInstance } from "../../../domain/models/ClientAtrributes";
import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
  return sequelize.define<ClientInstance>("Client", {
    id: {
      type: DataTypes.STRING,
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
      defaultValue: true,
    },
    quotaMax: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    clientType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Regular",
    },
    remainingQuota: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lastPayment: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
};
