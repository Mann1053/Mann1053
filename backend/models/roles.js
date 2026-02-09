const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../config/database");
const Permission = require("./permission");
const RolePermission = require("./rolePermission");
// const User = require("./user");

const Roles = sequelize.define(
  "roles",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
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

Roles.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: "roleId",
});
Permission.belongsToMany(Roles, {
  through: RolePermission,
  foreignKey: "permissionId",
});

// Roles.belongsToMany(User, { through: "roleId" });

module.exports = Roles;
