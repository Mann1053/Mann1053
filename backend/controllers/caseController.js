const { Case, User } = require("../models");

// Create a new case
const createCase = async (req, res) => {
  const { title, description, address, latitude, longitude, status, tags } = req.body;
  try {
    const newCase = await Case.create({
      title,
      description,
      address,
      latitude,
      longitude,
      status,
      tags,
      createdBy: req.user.id,
    });
    res.status(201).send(newCase);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all cases
const getCases = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status, sortBy = 'createdAt', sortDirection = 'DESC' } = req.query;
    const offset = (page - 1) * limit;
    
    const whereClause = {};
    if (search) {
      whereClause[require('sequelize').Op.or] = [
        { title: { [require('sequelize').Op.like]: `%${search}%` } },
        { description: { [require('sequelize').Op.like]: `%${search}%` } }
      ];
    }
    if (status) {
      whereClause.status = status;
    }

    const orderClause = [];
    if (['case_id', 'title', 'status', 'createdAt'].includes(sortBy) && ['ASC', 'DESC'].includes(sortDirection.toUpperCase())) {
      orderClause.push([sortBy, sortDirection.toUpperCase()]);
    }

    const cases = await Case.findAll({
      where: whereClause,
      include: [{ model: User, as: "creator", attributes: ["id", "username"] }],
      order: orderClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.send(cases);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get single case
const getCaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const caseData = await Case.findOne({
      where: { case_id: id },
      include: [{ model: User, as: "creator", attributes: ["id", "username"] }],
    });

    if (!caseData) {
      return res.status(404).send({ error: "Case not found" });
    }

    res.send(caseData);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a case
const updateCase = async (req, res) => {
  const { id } = req.params;
  const { title, description, address, latitude, longitude, status, tags } = req.body;
  try {
    const caseData = await Case.findOne({ where: { case_id: id } });
    if (!caseData) {
      return res.status(404).send({ error: "Case not found" });
    }

    await caseData.update({
      title: title || caseData.title,
      description: description !== undefined ? description : caseData.description,
      address: address !== undefined ? address : caseData.address,
      latitude: latitude !== undefined ? latitude : caseData.latitude,
      longitude: longitude !== undefined ? longitude : caseData.longitude,
      status: status || caseData.status,
      tags: tags !== undefined ? tags : caseData.tags,
    });

    res.send(caseData);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a case
const deleteCase = async (req, res) => {
  const { id } = req.params;
  try {
    const caseData = await Case.findOne({ where: { case_id: id } });
    if (!caseData) {
      return res.status(404).send({ error: "Case not found" });
    }
    await caseData.destroy();
    res.send({ message: "Case deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { createCase, getCases, getCaseById, updateCase, deleteCase };