const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const states = require("./states"); // Assuming you have the states model
const Country = require("./countries"); // Assuming you have the Country model

const Cities = sequelize.define(
  "Cities",
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
    state_id: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
      references: {
        model: states,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    state_code: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    country_id: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
      references: {
        model: Country,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    country_code: {
      type: DataTypes.CHAR(2),
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date("2014-01-01T01:01:01Z"),
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
    tableName: "cities",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Cities;
