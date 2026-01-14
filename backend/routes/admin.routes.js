const express = require('express');
const router = express.Router();
const { authorization } = require('../middlewares/authorize');
const { permit } = require('../middlewares/admin.middleware');
const adminController = require('../controllers/admin.controller');
const { updateUserRoleValidatorSchema, toggleUserStatusValidatorSchema, updateTodoValidatorSchema } = require('../validators/admin.validate');
const { validate } = require('../validators/validate');

router.get('/stats', authorization, permit('admin'), adminController.getStats);

router.get('/users', authorization, permit('admin'), adminController.getAllUsers);

module.exports = router;
