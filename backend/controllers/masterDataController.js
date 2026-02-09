const BandobastType = require('../models/BandobastType');
const PriorityLevel = require('../models/PriorityLevel');
const State = require('../models/State');
const City = require('../models/City');
const VipCategory = require('../models/VipCategory');
const ThreatLevel = require('../models/ThreatLevel');
const ApprovingAuthority = require('../models/ApprovingAuthority');
const { Op } = require('sequelize');

// ==================== BANDOBAST TYPES ====================

// Get all bandobast types with pagination and search
exports.getBandobastTypes = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', includeInactive = false } = req.query;
    const offset = (page - 1) * limit;

    const where = includeInactive === 'true' ? {} : { is_active: true };

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    const { count, rows } = await BandobastType.findAndCountAll({
      where,
      order: [['name', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
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
    console.error('Error fetching bandobast types:', error);
    res.status(500).json({ success: false, message: 'Error fetching bandobast types', error: error.message });
  }
};

// Create bandobast type
exports.createBandobastType = async (req, res) => {
  try {
    const { name, description, is_active = true } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    const type = await BandobastType.create({
      name,
      description,
      is_active
    });

    res.status(201).json({ success: true, data: type, message: 'Bandobast type created successfully' });
  } catch (error) {
    console.error('Error creating bandobast type:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ success: false, message: 'Bandobast type with this name already exists' });
    }
    res.status(500).json({ success: false, message: 'Error creating bandobast type', error: error.message });
  }
};

// Update bandobast type
exports.updateBandobastType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, is_active } = req.body;

    const type = await BandobastType.findByPk(id);
    if (!type) {
      return res.status(404).json({ success: false, message: 'Bandobast type not found' });
    }

    await type.update({
      name: name !== undefined ? name : type.name,
      description: description !== undefined ? description : type.description,
      is_active: is_active !== undefined ? is_active : type.is_active
    });

    res.json({ success: true, data: type, message: 'Bandobast type updated successfully' });
  } catch (error) {
    console.error('Error updating bandobast type:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ success: false, message: 'Bandobast type with this name already exists' });
    }
    res.status(500).json({ success: false, message: 'Error updating bandobast type', error: error.message });
  }
};

// Delete bandobast type (soft delete by setting is_active to false)
exports.deleteBandobastType = async (req, res) => {
  try {
    const { id } = req.params;

    const type = await BandobastType.findByPk(id);
    if (!type) {
      return res.status(404).json({ success: false, message: 'Bandobast type not found' });
    }

    await type.update({ is_active: false });

    res.json({ success: true, message: 'Bandobast type deleted successfully' });
  } catch (error) {
    console.error('Error deleting bandobast type:', error);
    res.status(500).json({ success: false, message: 'Error deleting bandobast type', error: error.message });
  }
};

// ==================== PRIORITY LEVELS ====================

// Get all priority levels with pagination and search
exports.getPriorityLevels = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', includeInactive = false } = req.query;
    const offset = (page - 1) * limit;

    const where = includeInactive === 'true' ? {} : { is_active: true };

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } }
      ];
    }

    const { count, rows } = await PriorityLevel.findAndCountAll({
      where,
      order: [['level', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
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
    console.error('Error fetching priority levels:', error);
    res.status(500).json({ success: false, message: 'Error fetching priority levels', error: error.message });
  }
};

// Create priority level
exports.createPriorityLevel = async (req, res) => {
  try {
    const { name, level, color, is_active = true } = req.body;

    if (!name || level === undefined) {
      return res.status(400).json({ success: false, message: 'Name and level are required' });
    }

    const priorityLevel = await PriorityLevel.create({
      name,
      level,
      color,
      is_active
    });

    res.status(201).json({ success: true, data: priorityLevel, message: 'Priority level created successfully' });
  } catch (error) {
    console.error('Error creating priority level:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ success: false, message: 'Priority level with this name already exists' });
    }
    res.status(500).json({ success: false, message: 'Error creating priority level', error: error.message });
  }
};

// Update priority level
exports.updatePriorityLevel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, level, color, is_active } = req.body;

    const priorityLevel = await PriorityLevel.findByPk(id);
    if (!priorityLevel) {
      return res.status(404).json({ success: false, message: 'Priority level not found' });
    }

    await priorityLevel.update({
      name: name !== undefined ? name : priorityLevel.name,
      level: level !== undefined ? level : priorityLevel.level,
      color: color !== undefined ? color : priorityLevel.color,
      is_active: is_active !== undefined ? is_active : priorityLevel.is_active
    });

    res.json({ success: true, data: priorityLevel, message: 'Priority level updated successfully' });
  } catch (error) {
    console.error('Error updating priority level:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ success: false, message: 'Priority level with this name already exists' });
    }
    res.status(500).json({ success: false, message: 'Error updating priority level', error: error.message });
  }
};

// Delete priority level
exports.deletePriorityLevel = async (req, res) => {
  try {
    const { id } = req.params;

    const priorityLevel = await PriorityLevel.findByPk(id);
    if (!priorityLevel) {
      return res.status(404).json({ success: false, message: 'Priority level not found' });
    }

    await priorityLevel.update({ is_active: false });

    res.json({ success: true, message: 'Priority level deleted successfully' });
  } catch (error) {
    console.error('Error deleting priority level:', error);
    res.status(500).json({ success: false, message: 'Error deleting priority level', error: error.message });
  }
};

// ==================== THREAT LEVELS ====================

// Get all threat levels with pagination and search
exports.getThreatLevels = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', includeInactive = false } = req.query;
    const offset = (page - 1) * limit;

    const where = includeInactive === 'true' ? {} : { is_active: true };

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }

    const { count, rows } = await ThreatLevel.findAndCountAll({
      where,
      order: [['level', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
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
    console.error('Error fetching threat levels:', error);
    res.status(500).json({ success: false, message: 'Error fetching threat levels', error: error.message });
  }
};

// Create threat level
exports.createThreatLevel = async (req, res) => {
  try {
    const { name, level, description, is_active = true } = req.body;

    if (!name || level === undefined) {
      return res.status(400).json({ success: false, message: 'Name and level are required' });
    }

    const threatLevel = await ThreatLevel.create({
      name,
      level,
      description,
      is_active
    });

    res.status(201).json({ success: true, data: threatLevel, message: 'Threat level created successfully' });
  } catch (error) {
    console.error('Error creating threat level:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ success: false, message: 'Threat level with this name already exists' });
    }
    res.status(500).json({ success: false, message: 'Error creating threat level', error: error.message });
  }
};

// Update threat level
exports.updateThreatLevel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, level, description, is_active } = req.body;

    const threatLevel = await ThreatLevel.findByPk(id);
    if (!threatLevel) {
      return res.status(404).json({ success: false, message: 'Threat level not found' });
    }

    await threatLevel.update({
      name: name !== undefined ? name : threatLevel.name,
      level: level !== undefined ? level : threatLevel.level,
      description: description !== undefined ? description : threatLevel.description,
      is_active: is_active !== undefined ? is_active : threatLevel.is_active
    });

    res.json({ success: true, data: threatLevel, message: 'Threat level updated successfully' });
  } catch (error) {
    console.error('Error updating threat level:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ success: false, message: 'Threat level with this name already exists' });
    }
    res.status(500).json({ success: false, message: 'Error updating threat level', error: error.message });
  }
};

// Delete threat level
exports.deleteThreatLevel = async (req, res) => {
  try {
    const { id } = req.params;

    const threatLevel = await ThreatLevel.findByPk(id);
    if (!threatLevel) {
      return res.status(404).json({ success: false, message: 'Threat level not found' });
    }

    await threatLevel.update({ is_active: false });

    res.json({ success: true, message: 'Threat level deleted successfully' });
  } catch (error) {
    console.error('Error deleting threat level:', error);
    res.status(500).json({ success: false, message: 'Error deleting threat level', error: error.message });
  }
};

// ==================== VIP CATEGORIES ====================

// Get all VIP categories with pagination and search
exports.getVipCategories = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', includeInactive = false } = req.query;
    const offset = (page - 1) * limit;

    const where = includeInactive === 'true' ? {} : { is_active: true };

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } }
      ];
    }

    const { count, rows } = await VipCategory.findAndCountAll({
      where,
      order: [['security_level', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
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
    console.error('Error fetching VIP categories:', error);
    res.status(500).json({ success: false, message: 'Error fetching VIP categories', error: error.message });
  }
};

// Create VIP category
exports.createVipCategory = async (req, res) => {
  try {
    const { name, security_level, is_active = true } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    const category = await VipCategory.create({
      name,
      security_level,
      is_active
    });

    res.status(201).json({ success: true, data: category, message: 'VIP category created successfully' });
  } catch (error) {
    console.error('Error creating VIP category:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ success: false, message: 'VIP category with this name already exists' });
    }
    res.status(500).json({ success: false, message: 'Error creating VIP category', error: error.message });
  }
};

// Update VIP category
exports.updateVipCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, security_level, is_active } = req.body;

    const category = await VipCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'VIP category not found' });
    }

    await category.update({
      name: name !== undefined ? name : category.name,
      security_level: security_level !== undefined ? security_level : category.security_level,
      is_active: is_active !== undefined ? is_active : category.is_active
    });

    res.json({ success: true, data: category, message: 'VIP category updated successfully' });
  } catch (error) {
    console.error('Error updating VIP category:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ success: false, message: 'VIP category with this name already exists' });
    }
    res.status(500).json({ success: false, message: 'Error updating VIP category', error: error.message });
  }
};

// Delete VIP category
exports.deleteVipCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await VipCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'VIP category not found' });
    }

    await category.update({ is_active: false });

    res.json({ success: true, message: 'VIP category deleted successfully' });
  } catch (error) {
    console.error('Error deleting VIP category:', error);
    res.status(500).json({ success: false, message: 'Error deleting VIP category', error: error.message });
  }
};

// ==================== APPROVING AUTHORITIES ====================

// Get all approving authorities with pagination and search
exports.getApprovingAuthorities = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', includeInactive = false } = req.query;
    const offset = (page - 1) * limit;

    const where = includeInactive === 'true' ? {} : { is_active: true };

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { designation: { [Op.like]: `%${search}%` } }
      ];
    }

    const { count, rows } = await ApprovingAuthority.findAndCountAll({
      where,
      order: [['rank', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
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
    console.error('Error fetching approving authorities:', error);
    res.status(500).json({ success: false, message: 'Error fetching approving authorities', error: error.message });
  }
};

// Create approving authority
exports.createApprovingAuthority = async (req, res) => {
  try {
    const { name, designation, rank, is_active = true } = req.body;

    if (!name || !designation) {
      return res.status(400).json({ success: false, message: 'Name and designation are required' });
    }

    const authority = await ApprovingAuthority.create({
      name,
      designation,
      rank,
      is_active
    });

    res.status(201).json({ success: true, data: authority, message: 'Approving authority created successfully' });
  } catch (error) {
    console.error('Error creating approving authority:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ success: false, message: 'Approving authority with this designation already exists' });
    }
    res.status(500).json({ success: false, message: 'Error creating approving authority', error: error.message });
  }
};

// Update approving authority
exports.updateApprovingAuthority = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, rank, is_active } = req.body;

    const authority = await ApprovingAuthority.findByPk(id);
    if (!authority) {
      return res.status(404).json({ success: false, message: 'Approving authority not found' });
    }

    await authority.update({
      name: name !== undefined ? name : authority.name,
      designation: designation !== undefined ? designation : authority.designation,
      rank: rank !== undefined ? rank : authority.rank,
      is_active: is_active !== undefined ? is_active : authority.is_active
    });

    res.json({ success: true, data: authority, message: 'Approving authority updated successfully' });
  } catch (error) {
    console.error('Error updating approving authority:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ success: false, message: 'Approving authority with this designation already exists' });
    }
    res.status(500).json({ success: false, message: 'Error updating approving authority', error: error.message });
  }
};

// Delete approving authority
exports.deleteApprovingAuthority = async (req, res) => {
  try {
    const { id } = req.params;

    const authority = await ApprovingAuthority.findByPk(id);
    if (!authority) {
      return res.status(404).json({ success: false, message: 'Approving authority not found' });
    }

    await authority.update({ is_active: false });

    res.json({ success: true, message: 'Approving authority deleted successfully' });
  } catch (error) {
    console.error('Error deleting approving authority:', error);
    res.status(500).json({ success: false, message: 'Error deleting approving authority', error: error.message });
  }
};

// ==================== STATES & CITIES (Keep existing) ====================

// Get all states
exports.getStates = async (req, res) => {
  try {
    const states = await State.findAll({
      attributes: ['id', 'name', 'country_id', 'country_code', 'iso2'],
      where: { flag: 1 },
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      data: states
    });
  } catch (error) {
    console.error('Error fetching states:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching states',
      error: error.message
    });
  }
};

// Get cities (optionally filtered by state)
exports.getCities = async (req, res) => {
  try {
    const { state_id } = req.query;
    const where = { flag: 1 };

    if (state_id) {
      where.state_id = state_id;
    }

    const cities = await City.findAll({
      where,
      attributes: ['id', 'name', 'state_id', 'latitude', 'longitude'],
      include: [{
        model: State,
        as: 'state',
        attributes: ['id', 'name']
      }],
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      data: cities
    });
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching cities',
      error: error.message
    });
  }
};
