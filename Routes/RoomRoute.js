const express = require('express');
const roomController = require('../Controllers/RoomController');

const router = express.Router();

// Define routes
router.get('/', (req, res) => roomController.getAllRooms(req, res));
router.get('/:id', (req, res) => roomController.getRoomById(req, res));
router.post('/', (req, res) => roomController.createRoom(req, res));
router.put('/:id', (req, res) => roomController.updateRoom(req, res));
router.delete('/:id', (req, res) => roomController.deleteRoom(req, res));

module.exports = router;
