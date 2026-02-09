const Role = require("../models/roles");
const Permission = require("../models/permission");

// Create a new role with permissions
exports.createRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;

    const role = await Role.create({ name });
    if (permissions && permissions.length > 0) {
      const permissionInstances = await Permission.findAll({
        where: {
          name: permissions,
        },
      });
      await role.addPermissions(permissionInstances);
    }

    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing role with permissions
exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, permissions } = req.body;
    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    role.name = name;
    await role.save();

    if (permissions && permissions.length > 0) {
      const permissionInstances = await Permission.findAll({
        where: {
          name: permissions,
        },
      });
      await role.setPermissions(permissionInstances);
    }

    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a role
exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id);

    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    await role.destroy();
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all roles
exports.getRoles = async (req, res) => {
  try {
    // Only super admins (roleId = 1) can see the super admin role
    // Other users will have super admin role filtered out
    const whereClause = req.user.role !== 1 ? { id: { [require('sequelize').Op.ne]: 1 } } : {};
    
    const roles = await Role.findAll({
      where: whereClause,
      include: Permission
    });
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single role by ID
exports.getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findByPk(id, { include: Permission });

    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
