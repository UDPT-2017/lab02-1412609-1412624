var Message = require('../models/message');
var User = require('../models/user');

var newMessagesController = {
    index: function (req, res) {
        User.getFriends(req.user.id, function (err, friends) {
            res.render('newMessage', { friends: friends });
        });
    },
}
module.exports = newMessagesController;
