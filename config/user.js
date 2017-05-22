var express = require('express');
var router = express.Router();
var db = require('../app/models/db');
var app = express();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');
// crypto
var bcrypt = require('bcrypt');
const saltRounds = 10;


// Register
router.get('/register', function (req, res) {
	res.render('register');

});

// Login
router.get('/login', function (req, res) {
	res.render('login');

});

// Register User
router.post('/register', function (req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var phonenumber = req.body.phonenumber;
	var password = req.body.password;
	var password2 = req.body.password2;

	//Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('phonenumber', 'Phone number is required').notEmpty();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors) {
		res.render('register', {
			errors: errors
		});
	} else {
		var newUser = ({
			name: name,
			email: email,
			phonenumber: phonenumber,
			username: username,
			password: password
		});

		//console.log(newUser);
		User.create(newUser, function (err) {
			if (err) {
				req.flash('error_msg', 'Registered fail! Please register again');
				res.redirect('/register');
				return console.error('error running query', err);
			} else {

				req.flash('success_msg', 'You are registered and can now login');
				res.redirect('/login');
			}
		});
	}

});


passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
},
	function (email, password, done) {
		User.getUserByEmail(email, function (err, user) {
			if (err) throw err;
			if (!user) { return done(null, false, { message: 'Unknown User' }) };
			if (user.password != password) { return done(null, false, { message: 'Invalid password' }) };
			return done(null, user);
		});
	}));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.getUserByID(id, function (err, user) {
		done(err, user);
	});
});


router.post('/login',
	passport.authenticate('local'),
	function (req, res) {
		if (!req.user) {
			req.flash('error_msg', 'Wrong user or password');
		} else {
			req.flash('success_msg', 'Log in successfully');
			res.redirect('/');
		}
	});

router.get('/logout', function (req, res) {
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/login');
});


router.get('/users', ensureAuthenticated, function (req, res) {
	User.getAllUsers(req.user.id, function (err, users) {
		res.render('users', { users: users });
	});
});

router.get('/messages', ensureAuthenticated, function (req, res) {
		User.getFriends(req.user.id, function (err, users) {
		res.render('messages', { users: users });
	});

});

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		req.flash('error_msg', 'You are not logged in');
		res.redirect('/login');
	}
}

router.post('/users', function (req, res) {
	console.log(req.body.id);
	User.addFriend(req.user.id, req.body.id, function (err) {
		if (err) {

		} else {

			res.redirect('/users');
		}
	});
});

module.exports = router;


