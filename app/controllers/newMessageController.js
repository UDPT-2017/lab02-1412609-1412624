//var Message = require('../models/message');

var newMessagesController = {
	index: function (req, res) {
			res.render('newMessage');
	}
}
module.exports = newMessagesController;
