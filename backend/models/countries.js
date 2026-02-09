const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Countries = sequelize.define(
  "Countries",
  {
    id: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    iso3: {
      type: DataTypes.CHAR(3),
      allowNull: true,
    },
    iso2: {
      type: DataTypes.CHAR(2),
      allowNull: true,
    },
    phonecode: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    capital: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    currency: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    currency_symbol: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    tld: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    native: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    region: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    subregion: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    timezones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    translations: {
      type: DataTypes.TEXT,
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
    emoji: {
      type: DataTypes.STRING(191),
      allowNull: true,
    },
    emojiU: {
      type: DataTypes.STRING(191),
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
    tableName: "countries",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Countries;
