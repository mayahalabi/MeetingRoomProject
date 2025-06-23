
const roomService = require('../Services/RoomService');

class RoomController {

    async getAllRooms(req, res) {
        try {
            const rooms = await roomService.getAllRooms();
            res.json(rooms);
        } catch (error) {
            console.error('Error fetching rooms:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    async getRoomById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const room = await roomService.getRoomById(id);
            if (!room) {
                return res.status(404).json({ message: 'Room not found' });
            }
            res.json(room);
        } catch (error) {
            console.error('Error fetching room:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async createRoom(req, res) {
        try {
            const { name, capacity, location, features } = req.body;
            if (!name || !location) { // complete other fields
                return res.status(400).json({ message: 'Name and location are required' });
            }
            const newRoom = await roomService.createRoom({ name, capacity, location, features });
            res.status(201).json(newRoom);
        } catch (error) {
            console.error('Error creating room:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateRoom(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const { name, capacity, location, features } = req.body;

            const success = await roomService.updateRoom(id, { name, capacity, location, features });
            if (!success) {
                return res.status(404).json({ message: 'Room not found or no changes made' });
            }
            res.json({ message: 'Room updated successfully' });
        } catch (error) {
            console.error('Error updating room:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteRoom(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const success = await roomService.deleteRoom(id);
            if (!success) {
                return res.status(404).json({ message: 'Room not found' });
            }
            res.json({ message: 'Room deleted successfully' });
        } catch (error) {
            console.error('Error deleting room:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new RoomController();
