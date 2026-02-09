const fs = require("fs");
const path = require("path");
const Template = require("../models/template");

// Helper function to convert base64 to image file and get filename
const base64ToImage = (base64String, fileName) => {
  const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3)
    throw new Error("Invalid base64 string");

  const [, fileType, imageData] = matches;
  const buffer = Buffer.from(imageData, "base64");
  const filePath = path.join(
    __dirname,
    "../uploads",
    `${fileName}.${fileType.split("/")[1]}`
  );

  fs.writeFileSync(filePath, buffer);
  return path.basename(filePath);
};

// Create a new template
exports.createTemplate = async (req, res) => {
  try {
    const templateData = { ...req.body };
    // const fileName = `thumbnail_${Date.now()}`;
    // templateData.thumbnail = base64ToImage(templateData.thumbnail, fileName);

    const template = await Template.create(templateData);
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing template
exports.updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const templateData = { ...req.body };

    const template = await Template.findByPk(id);
    if (!template) return res.status(404).json({ error: "Template not found" });

    if (templateData.thumbnail) {
      const fileName = `thumbnail_${Date.now()}`;
      templateData.thumbnail = base64ToImage(templateData.thumbnail, fileName);
    }

    await template.update(templateData);
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a template
exports.deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await Template.findByPk(id);
    if (!template) return res.status(404).json({ error: "Template not found" });

    const filePath = path.join(__dirname, "../uploads", template.thumbnail);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await template.destroy();
    res.status(200).json({ message: "Template deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all templates
exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.findAll();
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single template by ID
exports.getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await Template.findByPk(id);
    if (!template) return res.status(404).json({ error: "Template not found" });

    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
