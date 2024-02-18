// src/routes/index.js
const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../middleware/authMiddleware');


router.get('/',checkAuthenticated, (req, res) => {
  res.render('index.ejs', {name : req.user.name, id: req.user.id })
})

// index.jsに配置.
router.delete('/logout', (req, res) => {
    req.logout(() => { 
        res.redirect('/login');
    })
});

module.exports = router;