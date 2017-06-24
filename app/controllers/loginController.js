var loginController = {
    index: function (req, res) {
        res.render('login');
    },
    submit: function (req, res) {
        if (!req.user) {
            req.flash('error_msg', 'Wrong user or password');
        } else {
            req.flash('success_msg', 'Log in successfully');
            res.redirect('/');
        }
    }
}
module.exports = loginController;
