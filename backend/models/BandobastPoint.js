const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const BandobastPoint = sequelize.define('BandobastPoint', {
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
    point_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    location: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true
    },
    longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true
    },
    officers_required: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    point_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'bandobast_points',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = BandobastPoint;
