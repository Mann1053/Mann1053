const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  User,
  UserToken,
  Roles,
  RolePermission,
  Permission,
} = require("../models");
const { getSettingValue } = require("../services/settingsService");

const register = async (req, res) => {
  const {
    username,
    mobileNumber,
    emailAddress,
    password,
    roleId,
    country,
    state,
    city,
    address
  } = req.body;
  // Check if username already exists
  const existingUsername = await User.findOne({ where: { emailAddress } });
  if (existingUsername) {
    return res.status(400).send({ error: "Email Address already exists" });
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
    mobileNumber,
    emailAddress,
    roleId,
    country,
    state,
    city,
    address
  });
  // Exclude sensitive fields before sending response
  const { password: _, roleId: __, ...userData } = user.toJSON();
  res.status(201).send(userData);
};

// const login = async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ where: { username } });
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(400).send({ error: "Invalid login credentials" });
//   }

//   const token = jwt.sign(
//     { id: user.id, role: user.roleId },
//     process.env.JWT_SECRET
//   );

//   await UserToken.destroy({ where: { userId: user.id } });

//   await UserToken.create({ token, userId: user.id });

//   // Exclude sensitive fields before sending response
//   const { password: _, ...userData } = user.toJSON();

//   res.send({ userData, token });
// };

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Step 1: Find User
    const user = await User.findOne({
      where: { emailAddress: email, status: 1 },
    });
    
    if (!user) {
      return res.status(400).send({ error: "Invalid login credentials" });
    }

    // Step 2: Check and handle auto-unblock
    if (user.blockedUntil) {
      const now = new Date();
      if (now >= new Date(user.blockedUntil)) {
        // Auto-unblock user
        await User.update(
          { 
            blockedUntil: null, 
            otpAttempts: 0, 
            lastOtpAttempt: null 
          },
          { where: { id: user.id } }
        );
      } else {
        // Still blocked
        const blockTime = new Date(user.blockedUntil).toLocaleString();
        return res.status(400).send({ 
          error: `Account is blocked until ${blockTime}. Please try again later.` 
        });
      }
    }

    // Step 3: Verify password
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: "Invalid login credentials" });
    }

    // Step 4: Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Step 5: Update user with OTP
    await User.update(
      { otp: otp },
      { where: { id: user.id } }
    );

    res.send({ message: "OTP generated successfully" });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp, ip } = req.body;

    // Find user with matching email
    const user = await User.findOne({
      where: { emailAddress: email, status: 1 },
      include: [
        { model: Roles, as: "role", attributes: ["id", "name"] },
      ],
    });

    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }

    // Check if user is still blocked (backup check)
    if (user.blockedUntil && new Date() < new Date(user.blockedUntil)) {
      const blockTime = new Date(user.blockedUntil).toLocaleString();
      return res.status(400).send({ 
        error: `Account is blocked until ${blockTime}. Please try again later.` 
      });
    }

    // Check OTP
    if (user.otp !== otp) {
      // Increment OTP attempts
      const currentAttempts = (user.otpAttempts || 0) + 1;
      const maxAttempts = parseInt(await getSettingValue('max_otp_attempts', '5'));
      
      if (currentAttempts >= maxAttempts) {
        // Block user
        const blockDurationHours = parseInt(await getSettingValue('block_duration_hours', '24'));
        const blockedUntil = new Date();
        blockedUntil.setHours(blockedUntil.getHours() + blockDurationHours);
        
        await User.update(
          { 
            otpAttempts: 0,
            blockedUntil: blockedUntil,
            lastOtpAttempt: new Date(),
            lastLoginIp: ip

          },
          { where: { id: user.id } }
        );
        
        return res.status(400).send({ 
          error: `Account blocked for ${blockDurationHours} hours due to multiple failed OTP attempts.` 
        });
      } else {
        // Update attempts count
        await User.update(
          { 
            otpAttempts: currentAttempts,
            lastOtpAttempt: new Date(),
            lastLoginIp: ip
          },
          { where: { id: user.id } }
        );
        
        const remainingAttempts = maxAttempts - currentAttempts;
        return res.status(400).send({ 
          error: `Invalid OTP. ${remainingAttempts} attempts remaining before account block.` 
        });
      }
    }

    // OTP is correct - proceed with authentication
    // Get Role-Based Permissions
    const rolePermissions = await RolePermission.findAll({
      where: { roleId: user.roleId },
      include: [{ model: Permission, attributes: ["name"] }],
    });

    const permissions = rolePermissions.map((rp) => rp.permission.name);

    // Generate Token
    const token = jwt.sign(
      { id: user.id, role: user.roleId },
      process.env.JWT_SECRET
    );

    // Remove old tokens and save new token
    await UserToken.destroy({ where: { userId: user.id } });
    await UserToken.create({ token, userId: user.id });

    // Clear OTP and reset blocking fields after successful verification
    await User.update(
      { 
        // otp: null,
        otpAttempts: 0,
        blockedUntil: null,
        lastOtpAttempt: null,
        lastLoginIp: ip
      },
      { where: { id: user.id } }
    );

    // Exclude sensitive fields
    const { password: _, otp: __, ...userData } = user.toJSON();

    res.send({ user: userData, token, permissions });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  await UserToken.destroy({ where: { token } });
  res.send({ message: "Logged out successfully" });
};

module.exports = { register, login, verifyOTP, logout };
