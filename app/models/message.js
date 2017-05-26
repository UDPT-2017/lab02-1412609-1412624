var db = require('./db');

var Message = {
    getSeenMessage: function (iduser, callback) {
        db.query('select m.id, m.msg, m.suser, u.name,u.username, m.stime,m.rtime from messages m join users u on u.id = m.suser where rTime is not null and rUser = $1 order by stime asc',[iduser],
            function (err, result) {
                callback(err,result.rows);
            });
    },
    getUnreadMessage: function (user, callback) {
        db.query('select m.id, m.msg, m.suser, u.name,u.username, m.stime,m.rtime from messages m join users u on u.id = m.suser where rTime is null and rUser = $1 order by stime asc',[user.id],
            function (err, result) {
                callback(err,result.rows);
            });
    },
}
module.exports = Message;