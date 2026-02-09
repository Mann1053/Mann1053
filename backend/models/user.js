const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../config/database");
const Roles = require("./roles");
const Cities = require("./cities");
const States = require("./states");
const Countries = require("./countries");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: Roles,
        key: "id",
      },
    },
    mobileNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    emailAddress: {
      type: DataTypes.STRING(254),
      unique: true,
      allowNull: true,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: true,
    },
    state: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: true,
    },
    country: {
      type: DataTypes.MEDIUMINT.UNSIGNED,
      allowNull: true,
    },
    jobPosition: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    isDeleted: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isIn: [[0, 1]]
      }
    },
    otp: {
      type: DataTypes.STRING(6),
      allowNull: true,
      validate: {
        len: [6, 6],
        isNumeric: true
      }
    },
    otpAttempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    blockedUntil: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lastOtpAttempt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    lastLoginIp: {
      type: DataTypes.STRING(45),
      allowNull: true,
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

User.belongsTo(Roles, { foreignKey: "roleId" });
// User.belongsTo(Cities, { foreignKey: "id", as: "cityData" });
// User.belongsTo(States, { foreignKey: "id", as: "stateData" });
// User.belongsTo(Countries, { foreignKey: "id", as: "countryData" });
User.belongsTo(Cities, { foreignKey: "city", as: "cityData" });
User.belongsTo(States, { foreignKey: "state", as: "stateData" });
User.belongsTo(Countries, { foreignKey: "country", as: "countryData" });

module.exports = User;
