const BandobastStaff = require('../models/BandobastStaff');
const Bandobast = require('../models/Bandobast');
const { Op } = require('sequelize');
const csv = require('csv-parser');
const xlsx = require('xlsx');
const fs = require('fs');

// Get all staff for a specific bandobast
exports.getAllStaffByBandobast = async (req, res) => {
    try {
        const { bandobastId } = req.params;
        const { page = 1, limit = 100, search = '' } = req.query;

        // Verify bandobast exists
        const bandobast = await Bandobast.findByPk(bandobastId);
        if (!bandobast) {
            return res.status(404).json({
                success: false,
                message: 'Bandobast not found'
            });
        }

        const offset = (page - 1) * limit;
        const where = { bandobast_id: bandobastId };

        // Search filter
        if (search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { mobile_number: { [Op.like]: `%${search}%` } },
                { buckle_number: { [Op.like]: `%${search}%` } },
                { designation: { [Op.like]: `%${search}%` } }
            ];
        }

        const { count, rows } = await BandobastStaff.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['created_at', 'DESC']]
        });

        res.json({
            success: true,
            data: rows,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(count / limit)
            }
        });
    } catch (error) {
        console.error('Error fetching staff:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching staff',
            error: error.message
        });
    }
};

// Get single staff member by ID
exports.getStaffById = async (req, res) => {
    try {
        const { id } = req.params;

        const staff = await BandobastStaff.findByPk(id, {
            include: [{ model: Bandobast, as: 'bandobast', attributes: ['id', 'bandobast_name'] }]
        });

        if (!staff) {
            return res.status(404).json({
                success: false,
                message: 'Staff member not found'
            });
        }

        res.json({
            success: true,
            data: staff
        });
    } catch (error) {
        console.error('Error fetching staff:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching staff',
            error: error.message
        });
    }
};

// Create new staff member
exports.createStaff = async (req, res) => {
    try {
        const { bandobastId } = req.params;
        const { name, mobile_number, buckle_number, designation, duty_location } = req.body;

        // Verify bandobast exists
        const bandobast = await Bandobast.findByPk(bandobastId);
        if (!bandobast) {
            return res.status(404).json({
                success: false,
                message: 'Bandobast not found'
            });
        }

        // Create staff member
        const staff = await BandobastStaff.create({
            bandobast_id: bandobastId,
            name,
            mobile_number,
            buckle_number,
            designation,
            duty_location
        });

        res.status(201).json({
            success: true,
            message: 'Staff member added successfully',
            data: staff
        });
    } catch (error) {
        console.error('Error creating staff:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating staff member',
            error: error.message
        });
    }
};

// Update staff member
exports.updateStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, mobile_number, buckle_number, designation, duty_location } = req.body;

        const staff = await BandobastStaff.findByPk(id);

        if (!staff) {
            return res.status(404).json({
                success: false,
                message: 'Staff member not found'
            });
        }

        // Update staff member
        await staff.update({
            name,
            mobile_number,
            buckle_number,
            designation,
            duty_location
        });

        res.json({
            success: true,
            message: 'Staff member updated successfully',
            data: staff
        });
    } catch (error) {
        console.error('Error updating staff:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating staff member',
            error: error.message
        });
    }
};

// Delete staff member
exports.deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;

        const staff = await BandobastStaff.findByPk(id);

        if (!staff) {
            return res.status(404).json({
                success: false,
                message: 'Staff member not found'
            });
        }

        await staff.destroy();

        res.json({
            success: true,
            message: 'Staff member deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting staff:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting staff member',
            error: error.message
        });
    }
};

// Import staff from CSV/Excel file
exports.importStaffFromCSV = async (req, res) => {
    try {
        const { bandobastId } = req.params;

        // Verify bandobast exists
        const bandobast = await Bandobast.findByPk(bandobastId);
        if (!bandobast) {
            return res.status(404).json({
                success: false,
                message: 'Bandobast not found'
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const filePath = req.file.path;
        const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
        const staffData = [];

        // Parse based on file type
        if (fileExtension === 'csv') {
            // Parse CSV
            await new Promise((resolve, reject) => {
                fs.createReadStream(filePath)
                    .pipe(csv())
                    .on('data', (row) => {
                        staffData.push({
                            bandobast_id: bandobastId,
                            name: row.name || row.Name,
                            mobile_number: row.mobile_number || row.Mobile || row['Mobile Number'],
                            buckle_number: row.buckle_number || row.Buckle || row['Buckle Number'],
                            designation: row.designation || row.Designation,
                            duty_location: row.duty_location || row.Location || row['Duty Location']
                        });
                    })
                    .on('end', resolve)
                    .on('error', reject);
            });
        } else if (['xlsx', 'xls'].includes(fileExtension)) {
            // Parse Excel
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = xlsx.utils.sheet_to_json(worksheet);

            jsonData.forEach(row => {
                staffData.push({
                    bandobast_id: bandobastId,
                    name: row.name || row.Name,
                    mobile_number: row.mobile_number || row.Mobile || row['Mobile Number'],
                    buckle_number: row.buckle_number || row.Buckle || row['Buckle Number'],
                    designation: row.designation || row.Designation,
                    duty_location: row.duty_location || row.Location || row['Duty Location']
                });
            });
        } else {
            // Clean up file
            fs.unlinkSync(filePath);
            return res.status(400).json({
                success: false,
                message: 'Invalid file format. Please upload CSV or Excel file.'
            });
        }

        // Validate and filter valid entries
        const validStaff = staffData.filter(s => s.name && s.name.trim() !== '');

        if (validStaff.length === 0) {
            fs.unlinkSync(filePath);
            return res.status(400).json({
                success: false,
                message: 'No valid staff data found in file'
            });
        }

        // Bulk create staff
        const createdStaff = await BandobastStaff.bulkCreate(validStaff);

        // Clean up uploaded file
        fs.unlinkSync(filePath);

        res.status(201).json({
            success: true,
            message: `Successfully imported ${createdStaff.length} staff members`,
            data: {
                imported: createdStaff.length,
                total: staffData.length
            }
        });
    } catch (error) {
        console.error('Error importing staff:', error);

        // Clean up file on error
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({
            success: false,
            message: 'Error importing staff',
            error: error.message
        });
    }
};
