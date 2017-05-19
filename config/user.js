var express = require('express');
var router = express.Router();
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

// var User = require('../models/user');
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
	//req.checkBody('phonenumber', 'Phone number is not valid').isMobilePhone();
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
		var salt = bcrypt.genSaltSync(saltRounds);
		newUser.password = bcrypt.hashSync(newUser.password, salt);
		console.log(newUser);

		req.flash('success_msg', 'You are registered and can now login');
		res.redirect('/users/login');
	}

});


module.exports = router;


