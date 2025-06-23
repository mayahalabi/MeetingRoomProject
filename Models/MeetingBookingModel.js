
class meetingBooking {
    constructor(id, Title, Agenda, StartTime, EndTime, Status, RoomID, UserID) {
        this.id = id;
        this.Title = Title;
        this.Agenda = Agenda;
        this.StartTime = StartTime;
        this.EndTime = EndTime;
        this.Status = Status;
        this.RoomID = RoomID;
        this.UserID = UserID;
    }

    static fromRow(row) {
        return new room(
            row.id,
            row.Title,
            row.Agenda,
            row.StartTime,
            row.EndTime,
            row.Status,
            row.RoomID,
            row.UserID,
        )


    }
}

module.exports = meetingBooking;