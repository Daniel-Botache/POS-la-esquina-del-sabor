import sequelize from "../../infrastructure/config/database";
import { ClientInstance } from "./interfaces/ClientAtrributes";
import { Sequelize, DataTypes } from "sequelize";

// ... instances code
sequelize: Sequelize;
export const Client = sequelize.define<ClientInstance>("Client", {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  address: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  tel: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  dateIn: {
    allowNull: false,
    type: DataTypes.DATE,
  },
});
