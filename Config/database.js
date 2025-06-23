const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

var pool;
const initDB = async () => {
    if (!pool) {
        pool = mysql.createPool({
            host: process.env.DB_Host,
            user: process.env.DB_USER,
            password: process.env.DB_password,
            port: process.env.vop || 3307,
            connectlimit: 10
        })


    }
    //test conncetion
    try {
        await pool.getConnection()
        console.log(`connceted to ${process.env.DB_NAME} successfully`);
    } catch (e) {
        console.log('failed to connect', e);
    }
    return pool;
    //end of init DFFunction
}
module.exports = { initDB };