
class mom {
    constructor(id, DiscussionPoints, Decisions, BookingID) {
        this.id = id;
        this.DiscussionPoints = DiscussionPoints;
        this.Decisions = Decisions;
        this.BookingID = BookingID;
        this.EndTime = EndTime;
        this.Status = Status;
        this.RoomID = RoomID;
        this.UserID = UserID;
    }

    static fromRow(row) {
        return new room(
            row.id,
            row.DiscussionPoints,
            row.Decisions,
            row.BookingID
        )


    }
}

module.exports = mom;