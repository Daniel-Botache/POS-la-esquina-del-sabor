import { ProductInstance } from "../../../domain/models/ProductAttributes";
import { Sequelize, DataTypes, NOW } from "sequelize";

export default (sequelize: Sequelize) => {
  return sequelize.define<ProductInstance>("Product", {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    volume: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    maximum: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    barCode: {
      type: DataTypes.STRING,
      allowNull: true,
    
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue:
        "data:image/jpeg;base64,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",
    },
    lastVolumeDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: NOW,
    },
    isFavorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
  });
};
