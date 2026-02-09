const Role = require("../models/roles");
const Permission = require("../models/permission");
const { RolePermission } = require("../models");
// const RolePermission = require("../models/rolePermission");

// Assign permissions to a role
exports.assignPermissionsToRole = async (req, res) => {
  try {
    const { roleId, permissionIds } = req.body;

    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    if (
      !roleId ||
      !Array.isArray(permissionIds) ||
      permissionIds.length === 0
    ) {
      return res.status(400).json({ error: "Invalid roleId or permissionIds" });
    }

    const permissions = await Permission.findAll({
      where: {
        id: permissionIds,
      },
    });

    if (permissions.length !== permissionIds.length) {
      return res.status(400).json({ error: "Some permissions not found" });
    }

    const rolePermissions = permissionIds.map((permissionId) => ({
      roleId,
      permissionId,
    }));

    await RolePermission.bulkCreate(rolePermissions);

    res.status(200).json({ message: "Permissions assigned successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update role permissions
exports.updatePermissionsOfRole = async (req, res) => {
  try {
    const { roleId, permissionIds } = req.body;

    if (!roleId || !Array.isArray(permissionIds)) {
      return res.status(400).json({ error: "Invalid roleId or permissionIds" });
    }

    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    const currentPermissions = await RolePermission.findAll({
      where: { roleId },
      attributes: ["permissionId"],
    });

    const currentPermissionIds = currentPermissions.map(
      (rp) => rp.permissionId
    );

    // Permissions to add and to remove
    const permissionsToAdd = permissionIds.filter(
      (id) => !currentPermissionIds.includes(id)
    );
    const permissionsToRemove = currentPermissionIds.filter(
      (id) => !permissionIds.includes(id)
    );

    // Remove permissions
    await RolePermission.destroy({
      where: {
        roleId,
        permissionId: permissionsToRemove,
      },
    });

    // Add new permissions
    const newRolePermissions = permissionsToAdd.map((permissionId) => ({
      roleId,
      permissionId,
    }));

    await RolePermission.bulkCreate(newRolePermissions);

    res.status(200).json({ message: "Role permissions updated successfully" });
  } catch (error) {
    console.error("Error updating role permissions:", error);
    res.status(500).json({ error: error.message });
  }
};
