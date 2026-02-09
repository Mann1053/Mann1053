const Permission = require("../models/permission");
const RolePermission = require("../models/rolePermission");

// Create a new permission
exports.createPermission = async (req, res) => {
  try {
    const { name } = req.body;

    const permission = await Permission.create({ name });

    // Automatically assign the new permission to super admin role (roleId = 1)
    await RolePermission.create({
      roleId: 1,
      permissionId: permission.id
    });

    res.status(201).json(permission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing permission
exports.updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const permission = await Permission.findByPk(id);

    if (!permission) {
      return res.status(404).json({ error: "Permission not found" });
    }

    permission.name = name;
    await permission.save();

    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a permission
exports.deletePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findByPk(id);

    if (!permission) {
      return res.status(404).json({ error: "Permission not found" });
    }

    await permission.destroy();
    res.status(200).json({ message: "Permission deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all permissions
exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single permission by ID
exports.getPermissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findByPk(id);

    if (!permission) {
      return res.status(404).json({ error: "Permission not found" });
    }

    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
