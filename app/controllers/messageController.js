var User = require('../models/user');

var messagesController ={
    index: function (req, res) {
		User.getFriends(req.user.id, function (err, users) {
		res.render('messages', { users: users });
	});
}
}


module.exports = messagesController;


