var db = require("../models");
<<<<<<< HEAD

module.exports = function(app) {
  //old code to render stats page
=======
var isAuthenticated = require("../config/middleware/isAuthenticated");
var path = require("path");
const sql = require("sequelize");

module.exports = function (app) {
  app.get("/signup", function (req, res) {
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
    if (!req.user) {
      return res.redirect("/");   
    }
    res.sendFile(path.join(__dirname, "../public/members.html"));
  })

>>>>>>> ed8b07c2496db4f7d20ed5b3e6d3affdfcc4ef33
  app.get("/stats", function(req, res) {
    res.render("stats");
  });

<<<<<<< HEAD
  //get to the quiz page
=======
    //get to the quiz page
>>>>>>> ed8b07c2496db4f7d20ed5b3e6d3affdfcc4ef33
  app.get("/quiz/:quizId", (req, res) => {
    res.render("questions", {
      quiz: req.params.quizId
    });
  });

   // Render 404 page for any unmatched routes
   app.get("*", function (req, res) {
    console.log("hit the star route");
<<<<<<< HEAD
    res.render("404");
  });
};
=======
    res.render("404.handlebars");
  });
}
>>>>>>> ed8b07c2496db4f7d20ed5b3e6d3affdfcc4ef33
