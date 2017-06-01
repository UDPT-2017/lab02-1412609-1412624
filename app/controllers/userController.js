var User = require('../models/user');

var userController = {
    index: function (req, res) {
        User.getAllUsers(req.user.id, function (err, users) {
            res.render('users', { users: users });
        });
    },
    addFriend: function (req, res) {
      //  console.log(req.body.id); 
        User.addFriend(req.user.id, req.body.id, function (err) {
            if (err) {
            } else {
                res.redirect('/users');
            }
        });
    }
}

module.exports = userController;


