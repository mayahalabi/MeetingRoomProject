
const { initDB } = require('../Config/database');
const Room = require('../Models/RoomModel');

class RoomService {
    constructor() {
        this.pool = null;
        this.init();
    }

    async init() {
        this.pool = await initDB();
    }

    async getAllRooms() {
        const [rows] = await this.pool.query('SELECT * FROM room');
        return rows.map(Room.fromRow);
    }

    async getRoomById(id) {
        const [rows] = await this.pool.query('SELECT * FROM room WHERE RoomID = ?', [id]);
        if (rows.length === 0) return null;
        return Room.fromRow(rows[0]);
    }

    async createRoom(roomData) {
        const { name, capacity, location, features } = roomData;
        const [result] = await this.pool.query(
            'INSERT INTO room (Name, Capacity, Location, Features, fk_UserID) VALUES (?, ?, ?, ?, ?)',
            [name, capacity, location, features]
        );
        const insertedRoom = new Room(result.insertId, name, capacity, location, features);
        return insertedRoom;
    }

    async updateRoom(id, roomData) {
        const { name, capacity, location, features } = roomData;
        const [result] = await this.pool.query(
            'UPDATE room SET Name = ?, Capacity = ?, Location = ?, Features = ? WHERE RoomID = ?',
            [name, capacity, location, features, id]
        );
        return result.affectedRows > 0;
    }

    async deleteRoom(id) {
        try {
            const [result] = await this.pool.query('DELETE FROM room WHERE RoomID = ?', [id]);
            return result.affectedRows > 0;
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = new RoomService();
