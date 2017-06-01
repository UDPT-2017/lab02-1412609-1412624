var Message = require('../models/message');

var sentMessagesController = {
	index: function (req, res) {
		Message.getSentMessage(req.user, function (err, sentmessages) {
			res.render('sentMessages', { messages: sentmessages });
			//seenMessage = 'ádgfagsdfasf';
			console.log(sentmessages);

		});

	},

}
module.exports = sentMessagesController;


