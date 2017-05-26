var registerController = {
    index: function (req, res) {
        res.render('register');
    },
    submit: function (req, res) {
        var name = req.body.name;
        var email = req.body.email;
        var username = req.body.username;
        var phonenumber = req.body.phonenumber;
        var password = req.body.password;
        var password2 = req.body.password2;

        //Validation
        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('phonenumber', 'Phone number is required').notEmpty();
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

        var errors = req.validationErrors();

        if (errors) {
            res.render('register', {
                errors: errors
            });
        } else {
            var newUser = ({
                name: name,
                email: email,
                phonenumber: phonenumber,
                username: username,
                password: password
            });

            //console.log(newUser);
            User.create(newUser, function (err) {
                if (err) {
                    req.flash('error_msg', 'Registered fail! Please register again');
                    res.redirect('/register');
                    return console.error('error running query', err);
                } else {

                    req.flash('success_msg', 'You are registered and can now login');
                    res.redirect('/login');
                }
            });
        }

    }
}

module.exports = registerController;