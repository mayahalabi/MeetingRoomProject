
class file {
    constructor(id, FileName, FileURL, MomID) {
        this.id = id;
        this.FileName = FileName;
        this.FileURL = FileURL;
        this.MomID = MomID;
    }

    static fromRow(row) {
        return new room(
            row.id,
            row.FileName,
            row.FileURL,
            row.MomID
        )


    }
}

module.exports = file;