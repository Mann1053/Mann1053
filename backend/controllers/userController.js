const { User, Roles, Cities, States, Countries } = require("../models");
const bcrypt = require("bcryptjs");

// Add a new user
const addUser = async (req, res) => {
  const {
    username,
    password,
    roleId,
    mobileNumber,
    emailAddress,
    profilePicture,
    city,
    state,
    country,
    jobPosition,
    address,
    status,
    isDeleted,
  } = req.body;
  try {
    // Check if trying to create a super admin (roleId = 1)
    // Only super admins can create other super admins
    if (roleId === 1 && req.user.role !== 1) {
      return res.status(403).send({
        error: "Only super admins can create super admin users"
      });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).send({ error: "Username already exists" });
    }

    // Check if mobile number already exists
    const existingMobileNumber = await User.findOne({
      where: { mobileNumber },
    });
    if (existingMobileNumber) {
      return res.status(400).send({ error: "Mobile number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await User.create({
      username,
      password: hashedPassword,
      roleId,
      mobileNumber,
      emailAddress,
      profilePicture,
      city,
      state,
      country,
      jobPosition,
      address,
      status,
      isDeleted,
    });
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, searchField = 'username', sortBy = 'id', sortDirection = 'ASC' } = req.query;
    const offset = (page - 1) * limit;
    
    const whereClause = { isDeleted: false };
    if (search && ['username', 'mobileNumber', 'emailAddress', 'address'].includes(searchField)) {
      whereClause[searchField] = { [require('sequelize').Op.like]: `%${search}%` };
    }

    const orderClause = [];
    if (['id', 'username', 'roleId', 'status'].includes(sortBy) && ['ASC', 'DESC'].includes(sortDirection.toUpperCase())) {
      orderClause.push([sortBy, sortDirection.toUpperCase()]);
    }

    const users = await User.findAll({
      where: whereClause,
      include: [
        { model: Roles, as: "role", attributes: ["name"] },
        { model: Cities, as: "cityData", attributes: ["name"] },
        { model: States, as: "stateData", attributes: ["name"] },
        { model: Countries, as: "countryData", attributes: ["name"] },
      ],
      attributes: { exclude: ["password"] },
      order: orderClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get single user
const getUserById = async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from request parameters

    const user = await User.findOne({
      where: { id },
      include: [
        { model: Roles, as: "role", attributes: ["id", "name"] },
        { model: Cities, as: "cityData", attributes: ["id", "name"] },
        { model: States, as: "stateData", attributes: ["id", "name"] },
        { model: Countries, as: "countryData", attributes: ["id", "name"] },
      ],
      attributes: { exclude: ["password"] }, // Exclude password from response
    });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

// Update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    username,
    password,
    roleId,
    mobileNumber,
    emailAddress,
    profilePicture,
    city,
    state,
    country,
    jobPosition,
    address,
    status,
    isDeleted,
  } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Check if trying to update to super admin (roleId = 1)
    // Only super admins can set users to super admin role
    if (roleId === 1 && req.user.role !== 1) {
      return res.status(403).send({
        error: "Only super admins can assign super admin role"
      });
    }

    user.username = username || user.username;
    if (password) {
      user.password = await bcrypt.hash(password, 8);
    }
    user.roleId = roleId || user.roleId;
    user.mobileNumber = mobileNumber;
    user.emailAddress = emailAddress;
    user.profilePicture = profilePicture;
    user.city = city;
    user.state = state;
    user.country = country;
    user.jobPosition = jobPosition;
    user.address = address;
    user.status = status;
    if (isDeleted !== undefined) {
      user.isDeleted = isDeleted;
    }

    await user.save();
    
    // Fetch updated user with associations and exclude password
    const updatedUser = await User.findOne({
      where: { id },
      // include: [
      //   { model: Roles, as: "role", attributes: ["id", "name"] },
      //   { model: Cities, as: "cityData", attributes: ["id", "name"] },
      //   { model: States, as: "stateData", attributes: ["id", "name"] },
      //   { model: Countries, as: "countryData", attributes: ["id", "name"] },
      // ],
      attributes: { exclude: ["password"] },
    });
    
    res.send(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a user
// const deleteUser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findByPk(id);
//     if (!user) {
//       return res.status(404).send({ error: "User not found" });
//     }
//     await user.destroy();
//     res.send({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

module.exports = { addUser, getUsers, updateUser,  getUserById }; //deleteUser
