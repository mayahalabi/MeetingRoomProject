
class notification {
    constructor(id, Message, isRead, UserID) {
        this.id = id;
        this.Message = Message;
        this.isRead = isRead;
        this.UserID = UserID;
    }

    static fromRow(row) {
        return new Notification(
            row.id,
            row.Message,
            row.isRead,
            row.UserID
        )


    }
}

module.exports = notification;