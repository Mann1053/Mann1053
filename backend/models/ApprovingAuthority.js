const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ApprovingAuthority = sequelize.define('ApprovingAuthority', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  designation: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  rank: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'approving_authorities',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = ApprovingAuthority;
