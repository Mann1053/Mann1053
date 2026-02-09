const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const State = sequelize.define('State', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  country_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  country_code: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  fips_code: {
    type: DataTypes.STRING(255)
  },
  iso2: {
    type: DataTypes.STRING(255)
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8)
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8)
  },
  flag: {
    type: DataTypes.TINYINT,
    defaultValue: 1
  },
  wikiDataId: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'states',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = State;
