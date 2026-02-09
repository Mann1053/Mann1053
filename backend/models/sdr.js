const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const SDR = sequelize.define(
  "SDR",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    mobile_number: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    father_husband_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    nationality: {
      type: DataTypes.STRING(50),
      defaultValue: "Indian",
    },
    profession: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    alt_mobile: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    email_id: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    loc_addr: {
      type: DataTypes.STRING(355),
      allowNull: false,
    },
    loc_addr_pin: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    perm_addr: {
      type: DataTypes.STRING(355),
      allowNull: true,
    },
    perm_addr_pin: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    aadhar_idx: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    aadhar_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    pan_no: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    id_proof_type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    id_proof_number: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    addr_proof_type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    addr_proof_number: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    imsi: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    conn_type: {
      type: DataTypes.STRING(11),
      allowNull: true,
    },
    subscriber_status: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    service_provider: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    circle: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    prev_service_provider: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    prev_circle: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    caf_no: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    sim_act_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    sim_act_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    pos_code: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    pos_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    pos_agent: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    pos_addr: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    pos_addr_pin: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pos_agent_aadhar: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    pos_sign_mobile: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    lr_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    lr_addr: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    lr_mobile: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    cust_sign_mobile: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    csm_typ: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    photo_id_lat_long: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    ao_details: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    last_updated: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "sdr",
    timestamps: false, // No createdAt and updatedAt fields
    indexes: [
      { fields: ["mobile_number", "sim_act_date"], unique: true },
      { fields: ["id"] },
      { fields: ["aadhar_id"] },
      { fields: ["alt_mobile"] },
      { fields: ["pos_sign_mobile"] },
      { fields: ["lr_mobile"] },
      { fields: ["cust_sign_mobile"] },
      { fields: ["mobile_number"] },
    ],
  }
);

module.exports = SDR;
