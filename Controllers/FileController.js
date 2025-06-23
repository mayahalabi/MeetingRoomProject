
const fileService = require('../Services/FileServiceService');

class FileController {

    async getAllfiles(req, res) {
        try {
            const files = await fileService.getAllfiles();
            res.json(files);
        } catch (error) {
            console.error('Error fetching files:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    async getFileById(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const file = await fileService.getFileById(id);
            if (!file) {
                return res.status(404).json({ message: 'File not found' });
            }
            res.json(file);
        } catch (error) {
            console.error('Error fetching file:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async createFile(req, res) {
        try {
            const { name, url, momID } = req.body;
            if (!name || !url) { // complete other fields
                return res.status(400).json({ message: 'Name and URL are required' });
            }
            const newFile = await fileService.createFile({ name, url, momID });
            res.status(201).json(newFile);
        } catch (error) {
            console.error('Error creating file:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updateFile(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const { name, url, momID } = req.body;

            const success = await fileService.updateFile(id, { name, url, momID });
            if (!success) {
                return res.status(404).json({ message: 'File not found or no changes made' });
            }
            res.json({ message: 'File updated successfully' });
        } catch (error) {
            console.error('Error updating file:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async deleteFile(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const success = await fileService.deleteFile(id);
            if (!success) {
                return res.status(404).json({ message: 'File not found' });
            }
            res.json({ message: 'File deleted successfully' });
        } catch (error) {
            console.error('Error deleting file:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new FileController();
