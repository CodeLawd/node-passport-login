const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../models/Users");

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;

  const errors = [];

  // - Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "All fields are required" });
  }
  // - Check password match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }
  // - Check password length

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      name,
      email,
      password,
      password2,
      errors,
    });
  } else {
    //   ALL VALIDATION PASSED

    // CHECK IF USERS ALREADY EXISTS
    User.findOne({ email })
      .then((user) => {
        if (user) {
          errors.push({ msg: "Email  is already registered" });
          res.render("register", {
            name,
            email,
            password,
            password2,
            errors,
          });
        } else {
          //   if user does not exits
          const user = new User({ name, email, password });

          //   HASH USERS PASSWORDS
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
              if (err) throw err;

              user.password = hash;

              user
                .save()
                .then((user) => {
                  req.flash(
                    "success_msg",
                    "You are now registered and can log in"
                  );
                  res.redirect("/users/login");
                })
                .catch((err) => console.log(err));
            });
          });
        }
      })
      .catch((err) => console.log(err));
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You have been logged out successfully");
  res.redirect("/users/login");
});
module.exports = router;
