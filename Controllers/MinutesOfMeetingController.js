
const momService = require('../Services/MinutesOfMeetingService');

class MomController {

    async getAllMoms(req, res) {
        try {
            const moms = await momService.getAllMoms();
            res.json(moms);
        } catch (error) {
            console.error('Error fetching moms:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getMomById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const mom = await momService.getMomById(id);
            if (!mom) {
                return res.status(404).json({ message: 'Mom not found' });
            }
            res.json(mom);
        } catch (error) {
            console.error('Error fetching mom:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async createMom(req, res) {
        try {
            const { discussionPoints, decisions, fk_BookingID } = req.body;

            const newMom = await momService.createMom({ discussionPoints, decisions, fk_BookingID });

            res.status(201).json(newMom);
        } catch (error) {
            console.error('Error creating mom:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateMom(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const { discussionPoints, decisions, fk_BookingID } = req.body;

            const success = await momService.updateMom(id, { discussionPoints, decisions, fk_BookingID });
            if (!success) {
                return res.status(404).json({ message: 'Mom not found or no changes made' });
            }
            res.json({ message: 'Mom updated successfully' });
        } catch (error) {
            console.error('Error updating mom:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteMom(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const success = await momService.deleteMom(id);
            if (!success) {
                return res.status(404).json({ message: 'Mom not found' });
            }
            res.json({ message: 'Mom deleted successfully' });
        } catch (error) {
            console.error('Error deleting mom:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new MomController();
