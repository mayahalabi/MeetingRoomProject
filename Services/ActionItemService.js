
const { initDB } = require('../Config/database');
const ActionItem = require('../Models/ActionItemModel');

class ActionItemService {
    constructor() {
        this.pool = null;
        this.init();
    }

    async init() {
        this.pool = await initDB();
    }

    async getAllActionItems() {
        const [rows] = await this.pool.query('SELECT * FROM actionitem');
        return rows.map(ActionItem.fromRow);
    }

    async getActionItemById(id) {
        const [rows] = await this.pool.query('SELECT * FROM actionitem WHERE ItemID = ?', [id]);
        if (rows.length === 0) return null;
        return ActionItem.fromRow(rows[0]);
    }

    async createActionItem(actionItemData) {
        const { Description, DueDate, momID, userID } = actionItemData;
        const [result] = await this.pool.query(
            'INSERT INTO actionitem (Description, DueDate, MomID_fk, FKUserID) VALUES (?, ?, ?, ?)',
            [Description, DueDate, momID, userID]
        );
        const insertedActionItem = new ActionItem(result.insertId, Description, DueDate, momID, userID);
        return insertedActionItem;
    }

    async updateActionItem(id, actionItemData) {
        const { Description, DueDate, momID, userID } = actionItemData;
        const [result] = await this.pool.query(
            'UPDATE actionitem SET Description = ?, DueDate = ?, MomID_fk = ?, FKUserID = ? WHERE ItemID = ?',
            [Description, DueDate, momID, userID, id]
        );
        return result.affectedRows > 0;
    }

    async deleteActionItem(id) {
        try {
            const [result] = await this.pool.query('DELETE FROM actionitem WHERE ItemID = ?', [id]);
            return result.affectedRows > 0;
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = new ActionItemService();
