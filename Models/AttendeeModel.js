
class attendee {
    constructor(id, BookingID, UserID) {
        this.id = id;
        this.BookingID = BookingID;
        this.UserID = UserID;
    }

    static fromRow(row) {
        return new room(
            row.id,
            row.BookingID,
            row.UserID
        )
    }
}

module.exports = attendee;