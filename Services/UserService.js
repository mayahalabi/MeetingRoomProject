// services/userService.js
const { initDB } = require('../Config/database');
const User = require('../Models/UserModel');

class UserService {
    constructor() {
        this.pool = null;
        this.init();
    }

    async init() {
        this.pool = await initDB();
    }

    async getAllUsers() {
        const [rows] = await this.pool.query('SELECT * FROM user');
        return rows.map(User.fromRow);
    }

    async getUserById(id) {
        const [rows] = await this.pool.query('SELECT * FROM user WHERE UserID = ?', [id]);
        if (rows.length === 0) return null;
        return User.fromRow(rows[0]);
    }

    async createUser(userData) {
        const { firstName, lastName, email, password, role } = userData;
        const [result] = await this.pool.query(
            'INSERT INTO user (UserID, FirstName, LastName, Email, Password, Role) VALUES (?, ?, ?, ?, ?, ?)',
            [firstName, lastName, email, password, role]
        );
        const insertedUser = new User(result.insertId, firstName, lastName, email, password, role);
        return insertedUser;
    }

    async updateUser(id, userData) {
        const { firstName, lastName, password, email } = userData;
        const [result] = await this.pool.query(
            'UPDATE user SET FirstName = ?, LastName = ?, Email = ?, Password = ? WHERE UserID = ?',
            [firstName, lastName, email, password, id]
        );
        return result.affectedRows > 0;
    }

    async deleteUser(id) {
        try {
            const [result] = await this.pool.query('DELETE FROM user WHERE UserID = ?', [id]);
            return result.affectedRows > 0;
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = new UserService();
