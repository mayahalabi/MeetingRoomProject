const express = require('express');
const meetingBookingController = require('../Controllers/MeetingBookingControlller');

const router = express.Router();

// Define routes
router.get('/', (req, res) => meetingBookingController.getAllMeetingBookings(req, res));
router.get('/:id', (req, res) => meetingBookingController.getMeetingBookingById(req, res));
router.post('/', (req, res) => meetingBookingController.createMeetingBooking(req, res));
router.put('/:id', (req, res) => meetingBookingController.updateMeetingBooking(req, res));
router.delete('/:id', (req, res) => meetingBookingController.deleteMeetingBooking(req, res));

module.exports = router;
