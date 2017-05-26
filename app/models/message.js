var db = require('./db');

var Message = {
    getSeenMessage: function (user, callback) {
        // var salt = bcrypt.genSaltSync(saltRounds);
        // user.password = bcrypt.hashSync(user.password, salt);
        db.query('select m.id, m.msg, m.suser, u.name,u.username, m.stime,m.rtime from messages m join users u on u.id = m.suser where rTime is not null and rUser = $1 order by stime asc',
            [user.id],
            function (err, result) {
                callback(err);
            });
    },
    getUnreadMessage: function (user, callback) {
        // var salt = bcrypt.genSaltSync(saltRounds);
        // user.password = bcrypt.hashSync(user.password, salt);
        db.query('select m.id, m.msg, m.suser, u.name,u.username, m.stime,m.rtime from messages m join users u on u.id = m.suser where rTime is null and rUser = $1 order by stime asc',
            [user.id],
            function (err, result) {
                callback(err);
            });
    },
}
module.exports = Message;