
class user {
    constructor(id, FirstName, LastName, email, Password, Role, ProfilePic) {
        this.id = id;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.email = email;
        this.Password = Password;
        this.Role = Role;
        this.ProfilePic = ProfilePic;
    }

    static fromRow(row) {
        return new user(
            row.id,
            row.FirstName,
            row.LastName,
            row.email,
            row.Password,
            row.Role,
            row.ProfilePic
        )


    }
}

module.exports = user;