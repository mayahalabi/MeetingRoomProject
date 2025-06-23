const express = require('express');
const fileController = require('../Controllers/FileController');

const router = express.Router();

// Define routes
router.get('/', (req, res) => fileController.getAllfiles(req, res));
router.get('/:id', (req, res) => fileController.getFileById(req, res));
router.post('/', (req, res) => fileController.createFile(req, res));
router.put('/:id', (req, res) => fileController.updateFile(req, res));
router.delete('/:id', (req, res) => fileController.deleteFile(req, res));

module.exports = router;
