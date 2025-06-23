
const { initDB } = require('../Config/database');
const MeetingBooking = require('../Models/MeetingBookingModel');

class MeetingBookingService {
    constructor() {
        this.pool = null;
        this.init();
    }

    async init() {
        this.pool = await initDB();
    }

    async getAllMeetingBookings() {
        const [rows] = await this.pool.query('SELECT * FROM meetingbooking');
        return rows.map(MeetingBooking.fromRow);
    }

    async getMeetingBookingById(id) {
        const [rows] = await this.pool.query('SELECT * FROM meetingBooking WHERE BookingID = ?', [id]);
        if (rows.length === 0) return null;
        return MeetingBooking.fromRow(rows[0]);
    }

    async createMeetingBooking(meetingBookingData) {
        const { title, agenda, startTime, endTime, status } = meetingBookingData;
        const [result] = await this.pool.query(
            'INSERT INTO  meetingBooking (Title, Agenda, StartTime, EndTime, Status, fk_RoomID, UserIDFK) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [title, agenda, startTime, endTime, status]
        );
        const insertedMeetingBooking = new MeetingBooking(result.insertId, title, agenda, startTime, endTime, status);
        return insertedMeetingBooking;
    }

    async updateMeetingBooking(id, meetingBookingData) {
        const { title, agenda, status } = meetingBookingData;
        const [result] = await this.pool.query(
            'UPDATE meetingBooking SET Title = ?, Agenda = ?, Status = ? WHERE BookingID = ?',
            [title, agenda, status, id]
        );
        return result.affectedRows > 0;
    }

    async deleteMeetingBooking(id) {
        try {
            const [result] = await this.pool.query('DELETE FROM meetingBooking WHERE BookingID = ?', [id]);
            return result.affectedRows > 0;
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = new MeetingBookingService();
