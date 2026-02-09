const express = require('express');
const router = express.Router();
const masterDataController = require('../controllers/masterDataController');
const authenticate = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');

// All routes require authentication
router.use(authenticate);

// ==================== BANDOBAST TYPES ====================
router.get('/bandobast-types', checkRole('view_master_data'), masterDataController.getBandobastTypes);
router.post('/bandobast-types', checkRole('create_master_data'), masterDataController.createBandobastType);
router.put('/bandobast-types/:id', checkRole('update_master_data'), masterDataController.updateBandobastType);
router.delete('/bandobast-types/:id', checkRole('delete_master_data'), masterDataController.deleteBandobastType);

// ==================== PRIORITY LEVELS ====================
router.get('/priority-levels', checkRole('view_master_data'), masterDataController.getPriorityLevels);
router.post('/priority-levels', checkRole('create_master_data'), masterDataController.createPriorityLevel);
router.put('/priority-levels/:id', checkRole('update_master_data'), masterDataController.updatePriorityLevel);
router.delete('/priority-levels/:id', checkRole('delete_master_data'), masterDataController.deletePriorityLevel);

// ==================== THREAT LEVELS ====================
router.get('/threat-levels', checkRole('view_master_data'), masterDataController.getThreatLevels);
router.post('/threat-levels', checkRole('create_master_data'), masterDataController.createThreatLevel);
router.put('/threat-levels/:id', checkRole('update_master_data'), masterDataController.updateThreatLevel);
router.delete('/threat-levels/:id', checkRole('delete_master_data'), masterDataController.deleteThreatLevel);

// ==================== VIP CATEGORIES ====================
router.get('/vip-categories', checkRole('view_master_data'), masterDataController.getVipCategories);
router.post('/vip-categories', checkRole('create_master_data'), masterDataController.createVipCategory);
router.put('/vip-categories/:id', checkRole('update_master_data'), masterDataController.updateVipCategory);
router.delete('/vip-categories/:id', checkRole('delete_master_data'), masterDataController.deleteVipCategory);

// ==================== APPROVING AUTHORITIES ====================
router.get('/approving-authorities', checkRole('view_master_data'), masterDataController.getApprovingAuthorities);
router.post('/approving-authorities', checkRole('create_master_data'), masterDataController.createApprovingAuthority);
router.put('/approving-authorities/:id', checkRole('update_master_data'), masterDataController.updateApprovingAuthority);
router.delete('/approving-authorities/:id', checkRole('delete_master_data'), masterDataController.deleteApprovingAuthority);

// ==================== STATES & CITIES ====================
router.get('/states', masterDataController.getStates);
router.get('/cities', masterDataController.getCities);

module.exports = router;
