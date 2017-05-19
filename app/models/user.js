var db = require('./db');

var User = {
    create: function (user, callback) {
        db.query('insert into users(name, username, email, phone, password) values ($1, $2,$3,$4,$5)',
            [user.name, user.username, user.email, user.phonenumber, user.password],
            function (err, result) {
               // console.log(result.rows[0].name); // output: foo
               callback(err);
            });

    }
}



module.exports = User;
