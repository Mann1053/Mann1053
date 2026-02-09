const Setting = require("../models/setting");

// Get all settings
const getSettings = async (req, res) => {
  try {
    const settings = await Setting.findAll();
    res.send(settings);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create or update settings (upsert logic)
const createSettings = async (req, res) => {
  const { settings } = req.body;

  try {
    // Validate payload
    if (!settings || !Array.isArray(settings)) {
      return res.status(400).send({ error: "Invalid payload. 'settings' array is required." });
    }

    // Validate each setting
    for (const setting of settings) {
      if (!setting.name || setting.name.trim() === "") {
        return res.status(400).send({ error: "Setting name cannot be empty." });
      }

      // Check if setting with same name already exists
      const existingSetting = await Setting.findOne({ where: { name: setting.name } });
      if (existingSetting) {
        return res.status(400).send({ error: `Setting with name '${setting.name}' already exists.` });
      }
    }

    // Create all settings
    const createdSettings = await Setting.bulkCreate(settings);
    res.status(201).send(createdSettings);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Update a setting
const updateSetting = async (req, res) => {
  const { id } = req.params;
  const { name, value, isSystemvariable } = req.body;

  try {
    const setting = await Setting.findByPk(id);
    if (!setting) {
      return res.status(404).send({ error: "Setting not found" });
    }

    if (name && name.trim() === "") {
      return res.status(400).send({ error: "Setting name cannot be empty." });
    }

    setting.name = name || setting.name;
    setting.value = value !== undefined ? value : setting.value;
    setting.isSystemvariable = isSystemvariable !== undefined ? isSystemvariable : setting.isSystemvariable;

    await setting.save();
    res.send(setting);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a setting
const deleteSetting = async (req, res) => {
  const { id } = req.params;

  try {
    const setting = await Setting.findByPk(id);
    if (!setting) {
      return res.status(404).send({ error: "Setting not found" });
    }

    if (setting.isSystemvariable === 1) {
      return res.status(403).send({ error: "System variables cannot be deleted" });
    }

    await setting.destroy();
    res.send({ message: "Setting deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getSettings, createSettings, updateSetting, deleteSetting };