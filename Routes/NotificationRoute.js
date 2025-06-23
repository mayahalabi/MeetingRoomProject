const express = require('express');
const notificationController = require('../Controllers/NottificationControlller');

const router = express.Router();

// Define routes
router.get('/', (req, res) => notificationController.getAllNotifications(req, res));
router.get('/:id', (req, res) => notificationController.getNotificationById(req, res));
router.post('/', (req, res) => notificationController.createNotification(req, res));
router.put('/:id', (req, res) => notificationController.updateNotification(req, res));
router.delete('/:id', (req, res) => notificationController.deleteNotification(req, res));

module.exports = router;
