// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const User = require("./user");

// const UserToken = sequelize.define("UserToken", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   token: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   userId: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: User,
//       key: "id",
//     },
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
// });

// UserToken.belongsTo(User, { foreignKey: "userId" });

// module.exports = UserToken;

const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./user");

const UserToken = sequelize.define(
  "user_token",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
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

UserToken.belongsTo(User, { foreignKey: "userId" });

module.exports = UserToken;
