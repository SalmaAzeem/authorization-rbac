const express = require('express');
const router = express.Router();
const authenticateMiddleware = require("../middleware/auth.middleware");
const authorizeRoleMiddleware = require("../middleware/role.middleware");
const accessController = require("../controller/access.controller");

router.get('/public', accessController.public);
router.get('/protected', authenticateMiddleware, accessController.protected);
router.get('/moderator', authenticateMiddleware, authorizeRoleMiddleware(['moderator', 'admin']), accessController.moderator);
router.get('/admin', authenticateMiddleware, authorizeRoleMiddleware(['admin']), accessController.admin);

module.exports = router;