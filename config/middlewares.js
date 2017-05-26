var express = require('express')
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


module.exports = function (app) {
    // BodyParser Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());


    // Express Session
    app.use(session({
        secret: 'secret',
        saveUninitialized: true,
        resave: true
    }));

    // Passport init
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());
    // Global Vars
    app.use(function (req, res, next) {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        res.locals.user = req.user || null;
        next();
    });
    // Express Validator
    app.use(expressValidator({
        errorFormatter: function (param, msg, value) {
            var namespace = param.split('.')
                , root = namespace.shift()
                , formParam = root;

            while (namespace.length) {
                formParam += '[' + namespace.shift() + ']';
            }
            return {
                param: formParam,
                msg: msg,
                value: value
            };
        }
    }));

    app.use(express.static('public'));
    app.use('/components', express.static('bower_components'));
}