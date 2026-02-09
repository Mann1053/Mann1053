const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const staffController = require('../controllers/staffController');
const authenticate = require('../middlewares/authMiddleware');
const checkPermission = require('../middlewares/checkRole');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'staff-import-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['.csv', '.xlsx', '.xls'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only CSV and Excel files are allowed.'));
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// All routes require authentication
router.use(authenticate);

// Get all staff for a specific bandobast
router.get('/bandobasts/:bandobastId/staff',
    checkPermission('view_bandobast'),
    staffController.getAllStaffByBandobast
);

// Get single staff member
router.get('/staff/:id',
    checkPermission('view_bandobast'),
    staffController.getStaffById
);

// Create new staff member
router.post('/bandobasts/:bandobastId/staff',
    checkPermission('create_bandobast'),
    staffController.createStaff
);

// Update staff member
router.put('/staff/:id',
    checkPermission('update_bandobast'),
    staffController.updateStaff
);

// Delete staff member
router.delete('/staff/:id',
    checkPermission('delete_bandobast'),
    staffController.deleteStaff
);

// Import staff from CSV/Excel
router.post('/bandobasts/:bandobastId/staff/import',
    checkPermission('create_bandobast'),
    upload.single('file'),
    staffController.importStaffFromCSV
);

module.exports = router;
