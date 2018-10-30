var db = require("../models");

module.exports = function(app) {
  //old code to render stats page
  app.get("/stats", function(req, res) {
    res.render("stats");
  });

  //get to the quiz page
  app.get("/quiz/:quizId", (req, res) => {
    res.render("questions", {
      quiz: req.params.quizId
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    console.log("hit the star route");
    res.render("404");
  });
};
