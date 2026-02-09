const Countries = require("../models/countries");
const States = require("../models/states");
const Cities = require("../models/cities");

// 🟢 Get all countries
const getCountries = async (req, res) => {
  try {
    const countries = await Countries.findAll({
      attributes: ["id", "name", "iso2", "iso3", "phonecode"],
      order: [["name", "ASC"]],
    });
    res.status(200).json({ success: true, data: countries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Get states based on country ID
const getStatesByCountry = async (req, res) => {
  try {
    const { country_id } = req.params;
    const states = await States.findAll({
      where: { country_id },
      attributes: ["id", "name", "iso2", "latitude", "longitude"],
      order: [["name", "ASC"]],
    });

    if (!states.length) {
      return res
        .status(404)
        .json({ success: false, message: "No states found for this country." });
    }

    res.status(200).json({ success: true, data: states });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 Get cities based on state ID
const getCitiesByState = async (req, res) => {
  try {
    const { state_id } = req.params;
    const cities = await Cities.findAll({
      where: { state_id },
      attributes: ["id", "name", "latitude", "longitude"],
      order: [["name", "ASC"]],
    });

    if (!cities.length) {
      return res
        .status(404)
        .json({ success: false, message: "No cities found for this state." });
    }

    res.status(200).json({ success: true, data: cities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getCountries, getStatesByCountry, getCitiesByState };
