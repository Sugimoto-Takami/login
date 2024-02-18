// src/routes/register.js
const express = require('express');
const router = express.Router();
const pool = require('../db')
const bcrypt = require('bcrypt')
const { checkNotAuthenticated } = require('../middleware/authMiddleware');

router.get('/', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs');
})

router.post('/', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await pool.query('INSERT INTO useruser (id, name, email, password) VALUES ($1, $2, $3, $4)', [Date.now().toString(), req.body.name, req.body.email, hashedPassword]);
        res.redirect('/login');
    } catch (e) {
        console.log("Failure to register", e);
        res.redirect('/register');
    }
})

module.exports = router;