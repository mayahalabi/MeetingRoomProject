
const notificationService = require('../Services/NotificationService');

class NotificationController {

    async getAllNotifications(req, res) {
        try {
            const notifications = await notificationService.getAllNotifications();
            res.json(notifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    async getNotificationById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const notification = await notificationService.getNotificationById(id);
            if (!notification) {
                return res.status(404).json({ message: 'Notification not found' });
            }
            res.json(notification);
        } catch (error) {
            console.error('Error fetching notification:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async createNotification(req, res) {
        try {
            const { message, UserID_fk } = req.body;
            if (!message || !UserID_fk) { // complete other fields
                return res.status(400).json({ message: 'message and userid are required' });
            }
            const newNotification = await notificationService.createNotification({ message, UserID_fk });
            res.status(201).json(newNotification);
        } catch (error) {
            console.error('Error creating notification:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateNotification(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const { message, UserID_fk } = req.body;

            const success = await notificationService.updateNotification(id, { message, UserID_fk });
            if (!success) {
                return res.status(404).json({ message: 'Notification not found or no changes made' });
            }
            res.json({ message: 'Notification updated successfully' });
        } catch (error) {
            console.error('Error updating notification:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteNotification(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const success = await notificationService.deleteNotification(id);
            if (!success) {
                return res.status(404).json({ message: 'Notification not found' });
            }
            res.json({ message: 'Notification deleted successfully' });
        } catch (error) {
            console.error('Error deleting notification:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new NotificationController();
