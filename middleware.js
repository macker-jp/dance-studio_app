module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'ログインしてください');
    return res.redirect('/users/login');
  }
  next();
};