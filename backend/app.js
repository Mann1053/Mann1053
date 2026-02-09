const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { apiLimiter } = require("./middlewares/rateLimitMiddleware");
dotenv.config();

const { sequelize } = require("./config/database");
// Import models to ensure they are registered with sequelize before sync
require("./models/index");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");
const permissionRoutes = require("./routes/permissionRoutes");
const templateRoutes = require("./routes/templateRoutes");
const rolePermissionRoutes = require("./routes/rolePermissionRoutes");
const locationRoutes = require("./routes/locationRoutes");
const sdrRoutes = require("./routes/sdrRoutes");
const settingRoutes = require("./routes/settingRoutes");
const caseRoutes = require("./routes/caseRoutes");
const masterDataRoutes = require("./routes/masterData");
const bandobastRoutes = require("./routes/bandobast");
const staffRoutes = require("./routes/staff");
const app = express();

// Allow requests from 'http://localhost:3000'
// app.use(cors({
//   origin: 'http://localhost:3000'
// }));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // Add Vite port
    credentials: true,
  })
);
// Simple request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/api/v1", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());

// Apply rate limiting to all API routes
app.use("/api/v1", apiLimiter);

app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", roleRoutes);
app.use("/api/v1", permissionRoutes);
app.use("/api/v1", rolePermissionRoutes);
app.use("/api/v1", locationRoutes);
app.use("/api/v1", sdrRoutes);
app.use("/api/v1", settingRoutes);
app.use("/api/v1", caseRoutes);

//----------------------------------------------------------------
app.use("/api/v1", templateRoutes);
app.use("/api/v1/master-data", masterDataRoutes);
app.use("/api/v1/bandobasts", bandobastRoutes);
app.use("/api/v1", staffRoutes);

const startServer = async () => {
  try {
    await sequelize.sync(); // alter: true // Force recreation of all tables
    app.listen(5000, () => {
      console.log("Server is up on port 5000");
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
};

startServer();
