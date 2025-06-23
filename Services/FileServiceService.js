
const { initDB } = require('../Config/database');
const File = require('../Models/FileModel');

class FileService {
    constructor() {
        this.pool = null;
        this.init();
    }

    async init() {
        this.pool = await initDB();
    }

    async getAllfiles() {
        const [rows] = await this.pool.query('SELECT * FROM file');
        return rows.map(File.fromRow);
    }

    async getFileById(id) {
        const [rows] = await this.pool.query('SELECT * FROM file WHERE FileID = ?', [id]);
        if (rows.length === 0) return null;
        return File.fromRow(rows[0]);
    }

    async createFile(fileData) {
        const { name, url, momID } = fileData;
        const [result] = await this.pool.query(
            'INSERT INTO  file (FileName, FileURL, fk_MomID) VALUES (?, ?, ?)',
            [name, url, momID]
        );
        const insertedFile = new File(result.insertId, name, url, momID);
        return insertedFile;
    }

    async updateFile(id, fileData) {
        const { name, url, momID } = fileData;
        const [result] = await this.pool.query(
            'UPDATE file SET FileName = ?, FileURL = ?, fk_MomID = ? WHERE FileID = ?',
            [name, url, momID]
        );
        return result.affectedRows > 0;
    }

    async deleteFile(id) {
        try {
            const [result] = await this.pool.query('DELETE FROM file WHERE FileID = ?', [id]);
            return result.affectedRows > 0;
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = new FileService();
