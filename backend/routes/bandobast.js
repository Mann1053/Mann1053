const express = require('express');
const router = express.Router();
const bandobastController = require('../controllers/bandobastController');
const authenticate = require('../middlewares/authMiddleware');
const checkPermission = require('../middlewares/checkRole');

// All routes require authentication
router.use(authenticate);

// Get statistics (no specific permission required, just authenticated)
router.get('/stats', bandobastController.getBandobastStats);

// Create bandobast
router.post('/', 
  checkPermission('create_bandobast'),
  bandobastController.createBandobast
);

// Get all bandobasts with pagination and filters
router.get('/',
  checkPermission('view_bandobast'),
  bandobastController.getAllBandobasts
);

// Get single bandobast by ID
router.get('/:id',
  checkPermission('view_bandobast'),
  bandobastController.getBandobastById
);

// Update bandobast
router.put('/:id',
  checkPermission('update_bandobast'),
  bandobastController.updateBandobast
);

// Delete bandobast (soft delete)
router.delete('/:id',
  checkPermission('delete_bandobast'),
  bandobastController.deleteBandobast
);

module.exports = router;
