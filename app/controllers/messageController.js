var Message = require('../models/message');

var messagesController = {
	index: function (req, res) {
		Message.getSeenMessage(req.user.id, function (err, messagess) {
			console.log(messagess);
			res.render('messages', { messages: messagess });
		});
	},
	 
}
module.exports = messagesController;


