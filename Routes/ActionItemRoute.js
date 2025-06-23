const express = require('express');
const actionItemController = require('../Controllers/ActionItemController');

const router = express.Router();

// Define routes
router.get('/', (req, res) => actionItemController.getAllActionItems(req, res));
router.get('/:id', (req, res) => actionItemController.getActionItemById(req, res));
router.post('/', (req, res) => actionItemController.createActionItem(req, res));
router.put('/:id', (req, res) => actionItemController.updateActionItem(req, res));
router.delete('/:id', (req, res) => actionItemController.deleteActionItem(req, res));

module.exports = router;
