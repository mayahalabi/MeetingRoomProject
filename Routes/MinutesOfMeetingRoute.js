const express = require('express');
const momController = require('../Controllers/MinutesOfMeetingController');

const router = express.Router();

// Define routes
router.get('/', (req, res) => momController.getAllMoms(req, res));
router.get('/:id', (req, res) => momController.getMomById(req, res));
router.post('/', (req, res) => momController.createMom(req, res));
router.put('/:id', (req, res) => momController.updateMom(req, res));
router.delete('/:id', (req, res) => momController.deleteMom(req, res));

module.exports = router;
