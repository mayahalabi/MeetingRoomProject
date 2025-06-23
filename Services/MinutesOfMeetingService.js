
const { initDB } = require('../Config/database');
const Mom = require('../Models/MinutesOfMeetingModel');

class MomService {
    constructor() {
        this.pool = null;
        this.init();
    }

    async init() {
        this.pool = await initDB();
    }

    async getAllMoms() {
        const [rows] = await this.pool.query('SELECT * FROM minutesofmeeting');
        return rows.map(Mom.fromRow);
    }

    async getMomById(id) {
        const [rows] = await this.pool.query('SELECT * FROM minutesofmeeting WHERE MomID = ?', [id]);
        if (rows.length === 0) return null;
        return Mom.fromRow(rows[0]);
    }

    async createMom(momData) {
        const { discussionPoints, decisions, fk_BookingID } = momData;
        const [result] = await this.pool.query(
            'INSERT INTO minutesofmeeting (DiscussionPoints, Decisions, fk_BookingID) VALUES (?, ?, ?)',
            [discussionPoints, decisions, fk_BookingID]
        );
        const insertedMom = new Mom(result.insertId, discussionPoints, decisions, fk_BookingID);
        return insertedMom;
    }

    async updateMom(id, momData) {
        const { discussionPoints, decisions, fk_BookingID } = momData;
        const [result] = await this.pool.query(
            'UPDATE minutesofmeeting SET DiscussionPoints = ?, Decisions = ?, fk_BookingID = ? WHERE MomID = ?',
            [discussionPoints, decisions, fk_BookingID, id]
        );
        return result.affectedRows > 0;
    }

    async deleteMom(id) {
        try {
            const [result] = await this.pool.query('DELETE FROM minutesofmeeting WHERE MomID = ?', [id]);
            return result.affectedRows > 0;
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = new MomService();
