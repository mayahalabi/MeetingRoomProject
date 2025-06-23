
const userService = require('../Services/UserService');

class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();

            const data = {
                users: users
            }
            res.json(users);

        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getUserById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const user = await userService.getUserById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async createUser(req, res) {
        try {
            const { firstname, lastname, email, password, role } = req.body;
            const newUser = await userService.createUser({ firstname, lastname, email, password, role });
            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateUser(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const { firstname, lastname, password, email } = req.body;
            const success = await userService.updateUser(id, { firstname, lastname, password, email });
            if (!success) {
                return res.status(404).json({ message: 'User not found or no changes made' });
            }
            res.json({ message: 'User updated successfully' });

        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteUser(req, res) {
        try {
            const id = parseInt(req.params.id, 10);

            const success = await userService.deleteUser(id);
            if (!success) {
                return res.status(404).json({ message: 'User not found' });
                console.log('error deleting user.');
            }
            res.json({ message: 'User deleted successfully' });

        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async editUser(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const user = await userService.getUserById(id);
            if (!success) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}

module.exports = new UserController();
