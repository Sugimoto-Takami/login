// src/routes/login.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const { checkNotAuthenticated } = require('../middleware/authMiddleware');

// /loginが基準パス
router.get('/', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs');
});

router.post('/', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

/*
router.delete('/logout', (req, res) => {
    req.logout(() => { 
        res.redirect('/login');
    })
});
*/

module.exports = router;