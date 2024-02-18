// src/data/userService.js

const pool = require('../db');

async function getUserByField(fieldName, value) {
    try {
        const query = `SELECT id, name, email, password FROM useruser WHERE ${fieldName} = $1`;
        const result = await pool.query(query, [value]);
        return result.rows[0];
    } catch (e) {
        console.error('Error occurred:', e);
        return null;
    }
}

module.exports = getUserByField;