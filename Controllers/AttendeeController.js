
const attendeeService = require('../Services/AttendeeService');

class AttendeeController {

    async getAllAttendees(req, res) {
        try {
            const attendees = await attendeeService.getAllAttendees();
            res.json(attendees);
        } catch (error) {
            console.error('Error fetching attendees:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getAttendeeById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const attendee = await attendeeService.getAttendeeById(id);
            if (!attendee) {
                return res.status(404).json({ message: 'Attendee not found' });
            }
            res.json(attendee);
        } catch (error) {
            console.error('Error fetching attendee:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async createAttendee(req, res) {
        try {
            const { BookingId, UserID } = req.body;
            if (!BookingId || !UserID) { // complete other fields
                return res.status(400).json({ message: 'BookingId and UserID are required' });
            }
            const newAttendee = await attendeeService.createAttendee({ BookingId, UserID });
            res.status(201).json(newAttendee);
        } catch (error) {
            console.error('Error creating attendee:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateAttendee(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const { BookingId, UserID } = req.body;

            const success = await attendeeService.updateAttendee(id, { BookingId, UserID });
            if (!success) {
                return res.status(404).json({ message: 'Attendee not found or no changes made' });
            }
            res.json({ message: 'Attendee updated successfully' });
        } catch (error) {
            console.error('Error updating attendee:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteAttendee(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const success = await attendeeService.deleteAttendee(id);
            if (!success) {
                return res.status(404).json({ message: 'Attendee not found' });
            }
            res.json({ message: 'Attendee deleted successfully' });
        } catch (error) {
            console.error('Error deleting Attendee:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new AttendeeController();
