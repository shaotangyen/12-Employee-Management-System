require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createPool(
    {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: 'company_db'
    },
    console.log(`Database connected`)
).promise(); //passing "db" as a promise

module.exports = db;