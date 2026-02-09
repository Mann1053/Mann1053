const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const BandobastType = require('./BandobastType');
const PriorityLevel = require('./PriorityLevel');
const VipCategory = require('./VipCategory');
const ThreatLevel = require('./ThreatLevel');
const State = require('./State');
const City = require('./City');
const ApprovingAuthority = require('./ApprovingAuthority');

const Bandobast = sequelize.define('Bandobast', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Basic Details
  bandobast_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  bandobast_type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'bandobast_types', key: 'id' }
  },
  priority_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'priority_levels', key: 'id' }
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  event_description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  vip_category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'vip_categories', key: 'id' }
  },
  threat_level_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'threat_levels', key: 'id' }
  },
  // Event Details
  vip_event_name: DataTypes.STRING(255),
  vip_name: DataTypes.STRING(255),
  expected_crowd: { type: DataTypes.INTEGER, defaultValue: 0 },
  intelligence_notes: DataTypes.TEXT,

  // Location
  location: DataTypes.STRING(255),
  district: DataTypes.STRING(100),
  city_taluka: DataTypes.STRING(100),
  village: DataTypes.STRING(255),
  landmark: DataTypes.STRING(255),
  // Structure
  total_areas: { type: DataTypes.INTEGER, defaultValue: 0 },
  total_points: { type: DataTypes.INTEGER, defaultValue: 0 },
  // Manpower
  total_force: { type: DataTypes.INTEGER, defaultValue: 0 },
  shift_type: { type: DataTypes.ENUM('Single', 'Double', 'Triple'), defaultValue: 'Single' },
  // Officers
  assignment_mode: { type: DataTypes.ENUM('Auto', 'Manual', 'Hybrid'), defaultValue: 'Manual' },
  reporting_officer: DataTypes.STRING(100),
  backup_officer: DataTypes.STRING(100),
  replacement_allowed: { type: DataTypes.BOOLEAN, defaultValue: true },
  // Instructions
  general_instructions: DataTypes.TEXT,
  pointwise_instructions: DataTypes.TEXT,
  emergency_protocol: DataTypes.TEXT,
  uniform_type: { type: DataTypes.ENUM('Regular', 'Ceremonial', 'Riot Gear'), defaultValue: 'Regular' },
  // Communication
  group_chat_enabled: { type: DataTypes.BOOLEAN, defaultValue: false },
  emergency_broadcast: { type: DataTypes.BOOLEAN, defaultValue: false },
  language: { type: DataTypes.ENUM('Gujarati', 'English', 'Both'), defaultValue: 'Gujarati' },
  // Monitoring
  live_location_tracking: { type: DataTypes.BOOLEAN, defaultValue: false },
  location_update_interval: { type: DataTypes.ENUM('30sec', '1min', '5min'), defaultValue: '1min' },
  attendance_mode: { type: DataTypes.ENUM('Auto GPS', 'Manual'), defaultValue: 'Manual' },
  geo_fencing_enabled: { type: DataTypes.BOOLEAN, defaultValue: false },
  // Approval
  approving_authority_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'approving_authorities', key: 'id' }
  },
  remarks: DataTypes.TEXT,
  approval_status: { type: DataTypes.ENUM('Draft', 'Pending', 'Approved', 'Rejected'), defaultValue: 'Draft' },
  approval_date: DataTypes.DATE,
  // Post-Event
  auto_report_generation: { type: DataTypes.BOOLEAN, defaultValue: false },
  incident_logging: { type: DataTypes.BOOLEAN, defaultValue: false },
  photo_video_upload: { type: DataTypes.BOOLEAN, defaultValue: false },
  feedback_required: { type: DataTypes.BOOLEAN, defaultValue: false },
  // Metadata
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
  status: { type: DataTypes.ENUM('Active', 'Inactive', 'Completed', 'Cancelled'), defaultValue: 'Active' }
}, {
  tableName: 'bandobasts',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Define associations
Bandobast.belongsTo(BandobastType, { foreignKey: 'bandobast_type_id', as: 'bandobastType' });
Bandobast.belongsTo(PriorityLevel, { foreignKey: 'priority_id', as: 'priority' });
Bandobast.belongsTo(VipCategory, { foreignKey: 'vip_category_id', as: 'vipCategory' });
Bandobast.belongsTo(ThreatLevel, { foreignKey: 'threat_level_id', as: 'threatLevel' });
Bandobast.belongsTo(ApprovingAuthority, { foreignKey: 'approving_authority_id', as: 'approvingAuthority' });

module.exports = Bandobast;
