const express = require('express');
const router = express.Router();
const userController = require("../controller/user.controller");
const authenticateMiddleware = require("../middleware/auth.middleware");
const authorizeRoleMiddleware = require("../middleware/role.middleware");

router.get('/profile', authenticateMiddleware, userController.getProfile);
router.put('/profile', authenticateMiddleware, userController.updateProfile);
router.put('/profile/:id/role', authenticateMiddleware, authorizeRoleMiddleware(['admin']), userController.updateRole);

module.exports = router;