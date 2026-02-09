const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const State = require('./State');

const City = sequelize.define('City', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  state_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  state_code: {
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
  tableName: 'cities',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Define associations
City.belongsTo(State, { foreignKey: 'state_id', as: 'state' });
State.hasMany(City, { foreignKey: 'state_id', as: 'cities' });

module.exports = City;
