
const meetingBookingService = require('../Services/MeetingBookingService');

class MeetingBookingController {

    async getAllMeetingBookings(req, res) {
        try {
            const bookings = await meetingBookingService.getAllMeetingBookings();
            res.json(bookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    async getMeetingBookingById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const booking = await meetingBookingService.getMeetingBookingById(id);
            if (!booking) {
                return res.status(404).json({ message: 'booking not found' });
            }
            res.json(booking);
        } catch (error) {
            console.error('Error fetching booking:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async createMeetingBooking(req, res) {
        try {
            const { title, agenda, startTime, endTime, status } = req.body;
            if (!title) { // title is required
                return res.status(400).json({ message: 'title is required' });
            }
            const newMeetingBooking = await meetingBookingService.createMeetingBooking({ title, agenda, startTime, endTime, status });
            res.status(201).json(newMeetingBooking);
        } catch (error) {
            console.error('Error creating booking:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateMeetingBooking(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const { title, agenda, status } = req.body;

            const success = await meetingBookingService.updateMeetingBooking(id, { title, agenda, status });
            if (!success) {
                return res.status(404).json({ message: 'booking not found or no changes made' });
            }
            res.json({ message: 'booking updated successfully' });
        } catch (error) {
            console.error('Error updating booking:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteMeetingBooking(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const success = await meetingBookingService.deleteMeetingBooking(id);
            if (!success) {
                return res.status(404).json({ message: 'booking not found' });
            }
            res.json({ message: 'booking deleted successfully' });
        } catch (error) {
            console.error('Error deleting booking:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new MeetingBookingController();
