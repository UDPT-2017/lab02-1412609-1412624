var db = require('./db');

var Message = {
    getMessages: function (iduser, callback) {
        db.query('select m.id, m.msg, m.suser, u.name,u.username, m.stime,m.rtime from messages m join users u on u.id = m.suser where rUser = $1 order by stime asc', [iduser],
            function (err, result) {
                callback(err, result.rows);
            });
    },
    getSentMessage: function (user, callback) {
        db.query('select m.id, m.msg, m.suser, u.name,u.username, m.stime,m.rtime from messages m join users u on u.id = m.ruser where sUser = $1 order by stime asc', [user.id],
            function (err, result) {
                callback(err, result.rows);
            });
    },
    sendMessage: function (message, callback) {
        db.query('insert into messages (msg, sUser, rUser, sTime) values($1, $2, $3, LOCALTIMESTAMP)', [message.msg, message.sUser, message.rUser],
            function (err, result) {
                callback(err);
            });
    },
    updateRTime: function (message, callback) {
        db.query('insert into messages (msg, sUser, rUser, sTime) values($1, $2, $3, LOCALTIMESTAMP)', [message.msg, message.sUser, message.rUser],
            function (err, result) {
                callback(err);
            });
    },
}
module.exports = Message;

