var db = require("../models");
const path = require("path");
const sql = require("sequelize");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });



  // // To load the stats handlebars page for stats
  app.get("/stats", function(req, res) {

    db.find(... = ...)

    db.Post.findAll({
      where: {
        category: req.params.category
      }
    })

    //answer corect is a boolean, then check how many "true" for each 

    //query user info
    //then do math for this



    res.render("stats", {
      quizOneProgress: 60
    });

  // //for updating the progress bar with handlebars
  // $(".progress-bar").each(function(){
  //   console.log($(this).attr("aria-valuenow"));
   
  //       //for each quiz id
  //       //for each question id
  //       //if question correct then add % 1/?? total of question.length
  
  // });
  
  // });

  //old code to render stats page
  app.get("/stats", function(req, res) {
    res.render("stats");



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
  });
};
