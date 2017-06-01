var express = require('express');
var router = express.Router();
var controllers = require('../app/controllers');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');
// crypto
var bcrypt = require('bcrypt');
const saltRounds = 10;

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		req.flash('error_msg', 'You are not logged in');
		res.redirect('/login');
	}
}

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

//Login
router.get('/login', controllers.login.index);
router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }),
	controllers.login.submit);
// Register 
router.post('/register', controllers.register.submit);
router.get('/register', controllers.register.index);
// //Logout
router.get('/logout', controllers.logout.logout);
//About
router.get('/about', controllers.about.index);
//Messages
router.get('/messages', ensureAuthenticated, controllers.message.index);


router.get('/messages/new', ensureAuthenticated, controllers.newMesssage.index);
router.get('/messages/sent', ensureAuthenticated, controllers.sentMesssage.index);
router.get('/friends', ensureAuthenticated, controllers.friend.index);

router.post('/sendMess', ensureAuthenticated, controllers.newMesssage.sendMess);
//Users
router.get('/users', ensureAuthenticated, controllers.user.index);
router.post('/users', controllers.user.addFriend);
//Home
router.get('/', ensureAuthenticated, controllers.home.index);


module.exports = function(app){
	app.use('/',router);
}




