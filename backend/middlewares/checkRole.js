const { User, Roles, Permission } = require("../models"); // Adjust the path as necessary

const checkRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      if (req.user.role !== 1) {
        const userId = req.user_id; // Assuming req.user is set after authentication
        const user = await User.findByPk(userId, {
          include: {
            model: Roles,
            include: {
              model: Permission,
              attributes: ["name"],
            },
          },
        });

        // return res
        //   .status(200)
        //   .json({ user: user.role.permissions, requiredRole });

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const hasRole = user.role.permissions.some(
          (item) => item.name === requiredRole
        );

        user.role.name = requiredRole;
        if (!hasRole) {
          return res.status(403).json({
            message: "Access denied",
            // role: user.role.name,
            // hasRole: hasRole,
            // requiredRole: requiredRole,
          });
        }
      }
      next();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
};

module.exports = checkRole;
