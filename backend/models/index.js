const sequelize = require("../config/database");
// Import models in dependency order to avoid foreign key constraint errors
const Countries = require("./countries"); // No dependencies - import first
const States = require("./states"); // Depends on Countries
const Cities = require("./cities"); // Depends on States and Countries
const Roles = require("./roles"); // No location dependencies
const Permission = require("./permission"); // No dependencies
const RolePermission = require("./rolePermission"); // Depends on Roles and Permission
const UserToken = require("./userToken");
const userRole = require("./userRole");
const Setting = require("./setting");
const User = require("./user"); // Depends on Roles, Cities, States, Countries - import last
const Case = require("./case"); // Depends on User

// Bandobast models
const Bandobast = require("./Bandobast");
const BandobastStaff = require("./BandobastStaff");
const BandobastPoint = require("./BandobastPoint");
const BandobastPointOfficer = require("./BandobastPointOfficer");

const initDb = async () => {
  await sequelize.sync(); //{ alter: true }
  // Predefine roles
  //   await Role.bulkCreate([
  //     { name: "super admin" },
  //     { name: "sub admin" },
  //     { name: "editor" },
  //   ]);
};

// Set up relationships
// User.belongsToMany(Roles, { through: "UserRoles", foreignKey: "userId" });
// Roles.belongsToMany(User, { through: "UserRoles", foreignKey: "roleId" });
// Roles.belongsToMany(Permission, {
//   through: RolePermission,
//   foreignKey: "roleId",
// });
// Permission.belongsToMany(Roles, {
//   through: RolePermission,
//   foreignKey: "permissionId",
// });

// Set up Case relationships
Case.belongsTo(User, { foreignKey: "createdBy", as: "creator" });
User.hasMany(Case, { foreignKey: "createdBy", as: "cases" });

// Set up Bandobast relationships
Bandobast.hasMany(BandobastStaff, {
  foreignKey: 'bandobast_id',
  as: 'staff'
});
BandobastStaff.belongsTo(Bandobast, {
  foreignKey: 'bandobast_id',
  as: 'bandobast'
});

Bandobast.hasMany(BandobastPoint, {
  foreignKey: 'bandobast_id',
  as: 'points'
});
BandobastPoint.belongsTo(Bandobast, {
  foreignKey: 'bandobast_id',
  as: 'bandobast'
});

BandobastPoint.hasMany(BandobastPointOfficer, {
  foreignKey: 'point_id',
  as: 'assignedOfficers'
});
BandobastPointOfficer.belongsTo(BandobastPoint, {
  foreignKey: 'point_id',
  as: 'point'
});

BandobastPointOfficer.belongsTo(BandobastStaff, {
  foreignKey: 'staff_id',
  as: 'staffReference'
});

module.exports = {
  initDb,
  User,
  Roles,
  UserToken,
  Permission,
  RolePermission,
  userRole,
  Setting,
  Cities,
  States,
  Countries,
  Case,
  Bandobast,
  BandobastStaff,
  BandobastPoint,
  BandobastPointOfficer,
};
