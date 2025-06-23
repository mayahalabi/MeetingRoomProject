
class actionItem {
    constructor(id, Description, DueDate, MomID, UserID) {
        this.id = id;
        this.Description = Description;
        this.DueDate = DueDate;
        this.MomID = MomID;
        this.UserID = UserID;
    }

    static fromRow(row) {
        return new room(
            row.id,
            row.Description,
            row.DueDate,
            row.MomID,
            row.UserID
        )


    }
}

module.exports = actionItem;