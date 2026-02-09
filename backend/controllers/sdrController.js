const { Op } = require("sequelize");
const SDR = require("../models/sdr");

// const getSDRList = async (req, res) => {
//   try {
//     const { searchType, searchValue, page = 1, limit = 10 } = req.query;

//     const offset = (page - 1) * limit;
//     const whereCondition = {};

//     // Apply search filter
//     if (searchType && searchValue) {
//       const allowedSearchFields = [
//         "mobile_number",
//         "full_name",
//         "email_id",
//         "aadhar_id",
//         "pan_no",
//       ];

//       if (allowedSearchFields.includes(searchType)) {
//         whereCondition[searchType] = searchValue;
//       } else {
//         return res.status(400).json({ message: "Invalid search type" });
//       }
//     }

//     // Fetch records with pagination
//     const { rows, count } = await SDR.findAndCountAll({
//       where: whereCondition,
//       limit: parseInt(limit),
//       offset: parseInt(offset),
//       order: [["id", "DESC"]],
//     });

//     res.json({
//       totalRecords: count,
//       totalPages: Math.ceil(count / limit),
//       currentPage: parseInt(page),
//       data: rows,
//     });
//   } catch (error) {
//     console.error("Error fetching SDR records:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

const getSDRList = async (req, res) => {
  try {
    const { searchType, searchValue, page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;
    const whereCondition = {};

    // Apply search filter
    if (searchType && searchValue) {
      const allowedSearchFields = [
        "mobile_number",
        "full_name",
        "email_id",
        "aadhar_id",
        "pan_no",
      ];

      if (!allowedSearchFields.includes(searchType)) {
        return res.status(400).json({ message: "Invalid search type" });
      }

      if (searchType === "full_name") {
        // Allow searching by any part of the name
        const searchWords = searchValue.split(" "); // Split user input into multiple words
        const likeConditions = searchWords.map((word) => ({
          full_name: { [Op.like]: `%${word}%` },
        }));

        whereCondition[Op.and] = likeConditions;
      } else {
        // Exact match for other fields
        whereCondition[searchType] = { [Op.like]: `%${searchValue}%` };
      }
    }

    // Fetch records with pagination
    const { rows, count } = await SDR.findAndCountAll({
      where: whereCondition,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["id", "DESC"]],
    });

    res.json({
      totalRecords: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching SDR records:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getSDRList };
