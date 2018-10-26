var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var path = require("path");

module.exports = function (app) {
  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/members", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));

    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
      console.log("hit the star route");
      res.render("404");
    });
  });
}