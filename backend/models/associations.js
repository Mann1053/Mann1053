// Model Associations Setup
// This file sets up all Sequelize model associations
// Import this after all models are defined

const Bandobast = require('./Bandobast');
const BandobastStaff = require('./BandobastStaff');
const BandobastPoint = require('./BandobastPoint');
const BandobastPointOfficer = require('./BandobastPointOfficer');

// Bandobast <-> BandobastStaff
Bandobast.hasMany(BandobastStaff, {
    foreignKey: 'bandobast_id',
    as: 'staff'
});
BandobastStaff.belongsTo(Bandobast, {
    foreignKey: 'bandobast_id',
    as: 'bandobast'
});

// Bandobast <-> BandobastPoint
Bandobast.hasMany(BandobastPoint, {
    foreignKey: 'bandobast_id',
    as: 'points'
});
BandobastPoint.belongsTo(Bandobast, {
    foreignKey: 'bandobast_id',
    as: 'bandobast'
});

// BandobastPoint <-> BandobastPointOfficer
BandobastPoint.hasMany(BandobastPointOfficer, {
    foreignKey: 'point_id',
    as: 'assignedOfficers'
});
BandobastPointOfficer.belongsTo(BandobastPoint, {
    foreignKey: 'point_id',
    as: 'point'
});

// BandobastPointOfficer <-> BandobastStaff (optional reference)
BandobastPointOfficer.belongsTo(BandobastStaff, {
    foreignKey: 'staff_id',
    as: 'staff'
});

module.exports = {
    Bandobast,
    BandobastStaff,
    BandobastPoint,
    BandobastPointOfficer
};
