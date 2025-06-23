
class room {
    constructor(id, Name, Capacity, Location, Features, UserID) {
        this.id = id;
        this.Name = Name;
        this.LastName = LastName;
        this.Capacity = Capacity;
        this.Location = Location;
        this.Features = Features;
        this.UserID = UserID;
    }

    static fromRow(row) {
        return new room(
            row.id,
            row.Name,
            row.Capacity,
            row.Location,
            row.Features,
            row.UserID
        )


    }
}

module.exports = room;