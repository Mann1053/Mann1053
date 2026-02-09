const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database"); // Adjust the path based on your setup
const Countries = require("./countries"); // Assuming you have the Countries model

const states = sequelize.define(
  "states",
  {
    id: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    country_id: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
      references: {
        model: Countries,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    country_code: {
      type: DataTypes.CHAR(2),
      allowNull: false,
    },
    fips_code: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    iso2: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    flag: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
    wikiDataId: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "Rapid API GeoDB Cities",
    },
  },
  {
    tableName: "states",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = states;
