require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createPool(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the ${process.env.DB_NAME} database`)
);

module.exports = db;