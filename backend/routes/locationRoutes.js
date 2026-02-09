const express = require("express");
const {
  getCountries,
  getStatesByCountry,
  getCitiesByState,
} = require("../controllers/locationController");

const router = express.Router();

// Get list of countries
router.get("/countries", getCountries);

// Get states based on country ID
router.get("/states/:country_id", getStatesByCountry);

// Get cities based on state ID
router.get("/cities/:state_id", getCitiesByState);

module.exports = router;
