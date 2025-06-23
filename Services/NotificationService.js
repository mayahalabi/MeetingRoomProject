
const { initDB } = require('../Config/database');
const Notification = require('../Models/NotificationModel');

class NotificationService {
    constructor() {
        this.pool = null;
        this.init();
    }

    async init() {
        this.pool = await initDB();
    }

    async getAllNotifications() {
        const [rows] = await this.pool.query('SELECT * FROM notification');
        return rows.map(Notification.fromRow);
    }

    async getNotificationById(id) {
        const [rows] = await this.pool.query('SELECT * FROM notification WHERE NotificationID = ?', [id]);
        if (rows.length === 0) return null;
        return Notification.fromRow(rows[0]);
    }

    async createNotification(notificationData) {
        const { message, UserID_fk } = notificationData;
        const [result] = await this.pool.query(
            'INSERT INTO notification (message, UserID_fk) VALUES (?, ?)',
            [message, UserID_fk]
        );
        const insertedNotification = new Notification(result.insertId, message, UserID_fk);
        return insertedNotification;
    }

    async updateNotification(id, notificationData) {
        const { message, UserID_fk } = notificationData;
        const [result] = await this.pool.query(
            'UPDATE notification SET message = ?, UserID_fk = ? WHERE NotificationID = ?',
            [message, UserID_fk, id]
        );
        return result.affectedRows > 0;
    }

    async deleteNotification(id) {
        try {
            const [result] = await this.pool.query('DELETE FROM notification WHERE NotificationID = ?', [id]);
            return result.affectedRows > 0;
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = new NotificationService();
