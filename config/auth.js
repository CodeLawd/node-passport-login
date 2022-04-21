module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }

    req.flash("error_msg", "Please login first to access this resource");
    res.redirect("/users/login");
  },
};
