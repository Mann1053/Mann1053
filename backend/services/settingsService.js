const { Setting } = require("../models");

// Cache for settings to avoid frequent DB queries
const settingsCache = new Map();

const getSettingValue = async (key, defaultValue = null) => {
  try {
    // Check cache first
    if (settingsCache.has(key)) {
      return settingsCache.get(key);
    }

    // Fetch from database
    const setting = await Setting.findOne({ where: { name: key } });
    const value = setting ? setting.value : defaultValue;
    
    // Cache the value
    settingsCache.set(key, value);
    
    return value;
  } catch (error) {
    console.error(`Error fetching setting ${key}:`, error);
    return defaultValue;
  }
};

// Clear cache when settings are updated
const clearCache = (key = null) => {
  if (key) {
    settingsCache.delete(key);
  } else {
    settingsCache.clear();
  }
};

module.exports = {
  getSettingValue,
  clearCache,
};