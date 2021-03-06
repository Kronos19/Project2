var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");
var path = require("path");
const sql = require("sequelize");

module.exports = function (app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));
  });

  app.get("/signup", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/stats");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      return res.redirect("/stats");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/stats", function(req, res) {
    if (!req.user) {
      return res.redirect("/")
    } else {
      res.sendFile(path.join(__dirname, "../public/stats.html"));
    }
  });

    //get to the quiz page
  app.get("/quiz/:quizId", (req, res) => {
    if (!req.user) {
      res.redirect("/login")
    }
    else {
      res.render("questions.handlebars", {
        quiz: req.params.quizId
      });
    }
  });

  //  //Render 404 page for any unmatched routes
  //  app.get("*", function (req, res) {
  //   console.log("hit the star route");
  //   res.render("404");
  // });
};
