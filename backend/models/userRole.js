const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./user");
const Roles = require("./roles");

const UserRole = sequelize.define(
  "user_role",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: Roles,
        key: "id",
      },
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

Roles.belongsToMany(User, { through: UserRole, foreignKey: "roleId" });
User.belongsToMany(Roles, { through: UserRole, foreignKey: "userId" });

module.exports = UserRole;
