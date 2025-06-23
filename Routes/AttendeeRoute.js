const express = require('express');
const attendeeController = require('../Controllers/AttendeeController');

const router = express.Router();

// Define routes
router.get('/', (req, res) => attendeeController.getAllAttendees(req, res));
router.get('/:id', (req, res) => attendeeController.getAttendeeById(req, res));
router.post('/', (req, res) => attendeeController.createAttendee(req, res));
router.put('/:id', (req, res) => attendeeController.updateAttendee(req, res));
router.delete('/:id', (req, res) => attendeeController.deleteAttendee(req, res));

module.exports = router;
