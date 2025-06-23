
const actionItemService = require('../Services/ActionItemService');

class ActionItemController {

    async getAllActionItems(req, res) {
        try {
            const actions = await actionItemService.getAllActionItems();
            res.json(actions);
        } catch (error) {
            console.error('Error fetching actions:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    async getActionItemById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const action = await actionItemService.getActionItemById(id);
            if (!action) {
                return res.status(404).json({ message: 'action not found' });
            }
            res.json(action);
        } catch (error) {
            console.error('Error fetching action:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async createActionItem(req, res) {
        try {
            const { Description, DueDate, momID, userID } = req.body;

            const newActionItem = await actionItemService.createActionItem({ Description, DueDate, momID, userID });
            res.status(201).json(newActionItem);
        } catch (error) {
            console.error('Error creating action:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateActionItem(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const { Description, DueDate, momID, userID } = req.body;

            const success = await actionItemService.updateActionItem(id, { Description, DueDate, momID, userID });
            if (!success) {
                return res.status(404).json({ message: 'action not found or no changes made' });
            }
            res.json({ message: 'action updated successfully' });
        } catch (error) {
            console.error('Error updating action:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteActionItem(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const success = await actionItemService.deleteActionItem(id);
            if (!success) {
                return res.status(404).json({ message: 'action not found' });
            }
            res.json({ message: 'action deleted successfully' });
        } catch (error) {
            console.error('Error deleting action:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new ActionItemController();
