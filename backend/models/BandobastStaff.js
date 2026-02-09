const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Bandobast = require('./Bandobast');

const BandobastStaff = sequelize.define('BandobastStaff', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bandobast_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'bandobasts',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  mobile_number: {
    type: DataTypes.STRING(15),
    allowNull: true
  },
  buckle_number: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  designation: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  duty_location: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'bandobast_staff',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = BandobastStaff;
