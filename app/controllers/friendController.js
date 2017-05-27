var User = require('../models/user');

var friendController = {
    index: function (req, res) {
        User.getFriends(req.user.id, function (err, users) {
            res.render('friends', { users: users });
        });
    },
}

module.exports = friendController;