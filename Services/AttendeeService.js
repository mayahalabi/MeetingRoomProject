
const { initDB } = require('../Config/database');
const Attendee = require('../Models/AttendeeModel');

class AttendeeService {
    constructor() {
        this.pool = null;
        this.init();
    }

    async init() {
        this.pool = await initDB();
    }

    async getAllAttendees() {
        const [rows] = await this.pool.query('SELECT * FROM attendee');
        return rows.map(Attendee.fromRow);
    }

    async getAttendeeById(id) {
        const [rows] = await this.pool.query('SELECT * FROM attendee WHERE AttendeeID = ?', [id]);
        if (rows.length === 0) return null;
        return Attendee.fromRow(rows[0]);
    }

    async createAttendee(attendeeData) {
        const { BookingId, UserID } = attendeeData;
        const [result] = await this.pool.query(
            'INSERT INTO attendee (BookingId, UserID) VALUES (?, ?)',
            [BookingId, UserID]
        );
        const insertedAttendee = new Attendee(result.insertId, BookingId, UserID);
        return insertedAttendee;
    }

    async updateAttendee(id, attendeeData) {
        const { BookingId, UserID } = attendeeData;
        const [result] = await this.pool.query(
            'UPDATE attendee SET BookingID = ?, UserID = ? WHERE AttendeeID = ?',
            [BookingId, UserID]
        );
        return result.affectedRows > 0;
    }

    async deleteAttendee(id) {
        try {
            const [result] = await this.pool.query('DELETE FROM attendee WHERE AttendeeID = ?', [id]);
            return result.affectedRows > 0;
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = new AttendeeService();
