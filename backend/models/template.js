const { DataTypes, Sequelize, json } = require("sequelize");
const { sequelize } = require("../config/database");
const { status } = require("express/lib/response");

const Template = sequelize.define(
  "template",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    lang: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    parent_type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    child_type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    group_type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    platform_type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    canvas_width: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    canvas_height: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    canvas_units: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    thumbnail: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    json_file: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    old_json_file: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    is_paid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: true, // Ensure timestamps are enabled
  }
);

module.exports = Template;
