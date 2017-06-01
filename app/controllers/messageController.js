var Message = require('../models/message');

var messagesController = {
	index: function (req, res) {
		Message.getMessages(req.user.id, function (err, messages) {
			res.render('messages', { messages: messages });
			//seenMessage = 'ádgfagsdfasf';
			//console.log(seenMessage);
		});
		Message.updateRTime(req.user, function (err) {
			console.log('Da upadate');
		});
	},
	updateRTime: function (req, res) {
		Message.updateRTime(req.user, function (err) {

			console.log('Da upadate');
		});
	},

}
module.exports = messagesController;


