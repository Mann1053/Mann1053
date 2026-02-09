const Bandobast = require('../models/Bandobast');
const BandobastStaff = require('../models/BandobastStaff');
const BandobastPoint = require('../models/BandobastPoint');
const BandobastPointOfficer = require('../models/BandobastPointOfficer');
const BandobastType = require('../models/BandobastType');
const PriorityLevel = require('../models/PriorityLevel');
const VipCategory = require('../models/VipCategory');
const ThreatLevel = require('../models/ThreatLevel');
const ApprovingAuthority = require('../models/ApprovingAuthority');
const { Op, sequelize } = require('sequelize');
const { sequelize: db } = require('../config/database');

// Create new bandobast
exports.createBandobast = async (req, res) => {
  const transaction = await db.transaction();

  try {
    const { staff, points, ...bandobastData } = req.body;

    // Add created_by from authenticated user
    bandobastData.created_by = req.user.id;

    // Validate date (must be future or today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(bandobastData.start_date);

    if (startDate < today) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Event date cannot be in the past'
      });
    }

    // Create bandobast
    const bandobast = await Bandobast.create(bandobastData, { transaction });

    // Create staff if provided
    if (staff && Array.isArray(staff) && staff.length > 0) {
      const staffData = staff.map(s => ({
        ...s,
        bandobast_id: bandobast.id
      }));
      await BandobastStaff.bulkCreate(staffData, { transaction });
    }

    // Create points if provided
    if (points && Array.isArray(points) && points.length > 0) {
      for (let i = 0; i < points.length; i++) {
        const point = points[i];

        // Create point
        const createdPoint = await BandobastPoint.create({
          bandobast_id: bandobast.id,
          point_name: point.pointName,
          location: point.location,
          latitude: point.latitude || null,
          longitude: point.longitude || null,
          officers_required: point.officersRequired || 0,
          point_order: i + 1
        }, { transaction });

        // Create assigned officers for this point
        if (point.assignedOfficers && Array.isArray(point.assignedOfficers) && point.assignedOfficers.length > 0) {
          const officersData = point.assignedOfficers.map((officer, idx) => ({
            point_id: createdPoint.id,
            bandobast_id: bandobast.id,
            staff_id: null,  // Can be linked later if needed
            name: officer.name,
            mobile_number: officer.mobileNumber,
            buckle_number: officer.buckleNumber,
            designation: officer.designation,
            duty_location: officer.dutyLocation,
            officer_order: idx + 1
          }));

          await BandobastPointOfficer.bulkCreate(officersData, { transaction });
        }
      }
    }

    await transaction.commit();

    // Fetch complete bandobast with all associations
    const completeBandobast = await Bandobast.findByPk(bandobast.id, {
      include: [
        { model: BandobastType, as: 'bandobastType' },
        { model: PriorityLevel, as: 'priority' },
        { model: VipCategory, as: 'vipCategory' },
        { model: ThreatLevel, as: 'threatLevel' },
        { model: ApprovingAuthority, as: 'approvingAuthority' },
        { model: BandobastStaff, as: 'staff' },
        {
          model: BandobastPoint,
          as: 'points',
          include: [
            { model: BandobastPointOfficer, as: 'assignedOfficers' }
          ]
        }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Bandobast created successfully',
      data: completeBandobast
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating bandobast:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating bandobast',
      error: error.message
    });
  }
};

// Get all bandobasts with pagination, search, and filters
exports.getAllBandobasts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = '',
      status,
      approval_status,
      priority_id,
      bandobast_type_id,
      district_id,
      sort_by = 'created_at',
      sort_order = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    const where = {};

    // Search filter
    if (search) {
      where[Op.or] = [
        { bandobast_name: { [Op.like]: `%${search}%` } },
        { event_description: { [Op.like]: `%${search}%` } }
      ];
    }

    // Status filters
    if (status) where.status = status;
    if (approval_status) where.approval_status = approval_status;
    if (priority_id) where.priority_id = priority_id;
    if (bandobast_type_id) where.bandobast_type_id = bandobast_type_id;

    const { count, rows } = await Bandobast.findAndCountAll({
      where,
      include: [
        { model: BandobastType, as: 'bandobastType', attributes: ['id', 'name'] },
        { model: PriorityLevel, as: 'priority', attributes: ['id', 'name', 'color'] },
        { model: VipCategory, as: 'vipCategory', attributes: ['id', 'name', 'security_level'] },
        { model: ThreatLevel, as: 'threatLevel', attributes: ['id', 'name', 'level'] },
        { model: ApprovingAuthority, as: 'approvingAuthority', attributes: ['id', 'designation'] }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sort_by, sort_order]]
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching bandobasts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bandobasts',
      error: error.message
    });
  }
};

// Get single bandobast by ID
exports.getBandobastById = async (req, res) => {
  try {
    const { id } = req.params;

    const bandobast = await Bandobast.findByPk(id, {
      include: [
        { model: BandobastType, as: 'bandobastType' },
        { model: PriorityLevel, as: 'priority' },
        { model: VipCategory, as: 'vipCategory' },
        { model: ThreatLevel, as: 'threatLevel' },
        { model: ApprovingAuthority, as: 'approvingAuthority' },
        { model: BandobastStaff, as: 'staff' },
        {
          model: BandobastPoint,
          as: 'points',
          include: [
            { model: BandobastPointOfficer, as: 'assignedOfficers' }
          ]
        }
      ]
    });

    if (!bandobast) {
      return res.status(404).json({
        success: false,
        message: 'Bandobast not found'
      });
    }

    res.json({
      success: true,
      data: bandobast
    });
  } catch (error) {
    console.error('Error fetching bandobast:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching bandobast',
      error: error.message
    });
  }
};

// Update bandobast
exports.updateBandobast = async (req, res) => {
  try {
    const { id } = req.params;
    const { staff, points, ...bandobastData } = req.body;

    const bandobast = await Bandobast.findByPk(id);

    if (!bandobast) {
      return res.status(404).json({
        success: false,
        message: 'Bandobast not found'
      });
    }

    // Update bandobast
    await bandobast.update(bandobastData);

    // Update staff if provided
    if (staff && Array.isArray(staff)) {
      // Delete existing staff
      await BandobastStaff.destroy({ where: { bandobast_id: id } });

      // Create new staff
      if (staff.length > 0) {
        const staffData = staff.map(s => ({
          ...s,
          bandobast_id: id
        }));
        await BandobastStaff.bulkCreate(staffData);
      }
    }

    // Update points if provided
    if (points && Array.isArray(points)) {
      const existingPoints = await BandobastPoint.findAll({
        where: { bandobast_id: id },
        attributes: ['id']
      });
      const pointIds = existingPoints.map(p => p.id);
      if (pointIds.length > 0) {
        await BandobastPointOfficer.destroy({ where: { point_id: { [Op.in]: pointIds } } });
        await BandobastPoint.destroy({ where: { id: { [Op.in]: pointIds } } });
      }

      if (points.length > 0) {
        for (let i = 0; i < points.length; i++) {
          const point = points[i];
          const createdPoint = await BandobastPoint.create({
            bandobast_id: id,
            point_name: point.pointName,
            location: point.location,
            latitude: point.latitude || null,
            longitude: point.longitude || null,
            officers_required: point.officersRequired || 0,
            point_order: i + 1
          });

          if (point.assignedOfficers && Array.isArray(point.assignedOfficers) && point.assignedOfficers.length > 0) {
            const officersData = point.assignedOfficers.map((officer, idx) => ({
              point_id: createdPoint.id,
              bandobast_id: id,
              staff_id: null,
              name: officer.name,
              mobile_number: officer.mobileNumber,
              buckle_number: officer.buckleNumber,
              designation: officer.designation,
              duty_location: officer.dutyLocation,
              officer_order: idx + 1
            }));
            await BandobastPointOfficer.bulkCreate(officersData);
          }
        }
      }
    }

    // Fetch updated bandobast with associations
    const updatedBandobast = await Bandobast.findByPk(id, {
      include: [
        { model: BandobastType, as: 'bandobastType' },
        { model: PriorityLevel, as: 'priority' },
        { model: VipCategory, as: 'vipCategory' },
        { model: ThreatLevel, as: 'threatLevel' },
        { model: ApprovingAuthority, as: 'approvingAuthority' },
        { model: BandobastStaff, as: 'staff' }
      ]
    });

    res.json({
      success: true,
      message: 'Bandobast updated successfully',
      data: updatedBandobast
    });
  } catch (error) {
    console.error('Error updating bandobast:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating bandobast',
      error: error.message
    });
  }
};

// Delete bandobast (soft delete)
exports.deleteBandobast = async (req, res) => {
  try {
    const { id } = req.params;

    const bandobast = await Bandobast.findByPk(id);

    if (!bandobast) {
      return res.status(404).json({
        success: false,
        message: 'Bandobast not found'
      });
    }

    // Soft delete by setting status to Cancelled
    await bandobast.update({ status: 'Cancelled' });

    res.json({
      success: true,
      message: 'Bandobast deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting bandobast:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting bandobast',
      error: error.message
    });
  }
};

// Get bandobast statistics
exports.getBandobastStats = async (req, res) => {
  try {
    const totalBandobasts = await Bandobast.count();
    const activeBandobasts = await Bandobast.count({ where: { status: 'Active' } });
    const draftBandobasts = await Bandobast.count({ where: { approval_status: 'Draft' } });
    const approvedBandobasts = await Bandobast.count({ where: { approval_status: 'Approved' } });
    const completedBandobasts = await Bandobast.count({ where: { status: 'Completed' } });

    res.json({
      success: true,
      data: {
        total: totalBandobasts,
        active: activeBandobasts,
        draft: draftBandobasts,
        approved: approvedBandobasts,
        completed: completedBandobasts
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};
