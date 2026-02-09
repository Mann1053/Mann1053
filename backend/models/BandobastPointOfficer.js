const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const BandobastPointOfficer = sequelize.define('BandobastPointOfficer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    point_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'bandobast_points',
            key: 'id'
        }
    },
    bandobast_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'bandobasts',
            key: 'id'
        }
    },
    staff_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'bandobast_staff',
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
    },
    officer_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'bandobast_point_officers',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = BandobastPointOfficer;
