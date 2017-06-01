var Message = require('../models/message');
var User = require('../models/user');

var newMessagesController = {
    index: function (req, res) {
        User.getFriends(req.user.id, function (err, friends) {
            res.render('newMessage', { friends: friends });
        });
    },
	
	sendMess: function (req, res) {
		    var newMessage = ({
                msg: req.body.msg,
                sUser: req.user.id,
                rUser: req.body.id,
            });
        Message.sendMessage(newMessage, function (err) {
            if(err) throw err;
            else{
                    req.flash('success_msg', 'Your message have been sent');
                    res.redirect('/messages/new');
            }
        });
    },
}
module.exports = newMessagesController;
