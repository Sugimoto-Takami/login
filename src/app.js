// src/app.js
// issue2というbranchでこのコメントを追加.
const express = require('express');
const app = express();

// アプリケーション全体で一度だけ設定.
// 各ルーティングは, 代わりに const router = express.Router();
const session = require('express-session');
const flash = require('express-flash');
const methodOverride = require('method-override');

const path = require('path');
const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

const initializePassport = require('./config/passport-config'); 
const passport = require('passport');
const pool = require('./db');
const getUserByField = require('./data/userService');

app.set('view engine', 'ejs');
// viewsのパスを設定.
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended : false} ));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(methodOverride('_method'));

app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport, getUserByField);

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

module.exports = app;