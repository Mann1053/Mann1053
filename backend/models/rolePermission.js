const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../config/database");
const Roles = require("./roles");
const Permission = require("./permission");

const RolePermission = sequelize.define(
  "role_permission",
  {
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: Roles,
        key: "id",
      },
    },
    permissionId: {
      type: DataTypes.INTEGER,
      references: {
        model: Permission,
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

// 🔥 Define Associations
RolePermission.belongsTo(Permission, { foreignKey: "permissionId" });
Permission.hasMany(RolePermission, { foreignKey: "permissionId" });

module.exports = RolePermission;
