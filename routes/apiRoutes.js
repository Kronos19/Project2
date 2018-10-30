//todo: add error handling to routes?
// 1x3-2x0-3x4-4x2
var formidable = require('formidable');
var db = require("../models");

// grab current users correct string
// parse it
// if incoming qId is already in the string then do nothing
// if its not then add it, in order

module.exports = function(app) {
  // route for submitting quiz question results
  app.post("/api/questions/result", (req, res) => {
    console.log(req.body);
    db.Users.findOne({
      where: {
        id: req.body.userId
      }
    }).then(data => {
      console.log("line 20");
      console.log(data.id, "user-", data.username);
      console.log("line 22");
      console.log(data.correct);
    }).catch(err => {
      console.log(err);
    });
    const jsonResponse = { msgFromServer: "Great job!!!" };
    res.json(jsonResponse);
  });

  //------------------------------------------------
  //db testing routes for our models----------------

  // view all questions
  app.get("/api/newquest", (req, res) => {
    db.Questions.findAll().then(data => {
      res.json(data);
    });
  });

  // get all question where quizId = x
  app.get("/api/quiz/:quizId", (req, res) => {
    db.Questions.findAll({
      where: {
        quizId: req.params.quizId
      }
    }).then(data => {
      res.json(data);
    });
  });

  // create a new question
  app.post("/api/newquest", (req, res) => {
    db.Questions.create(req.body).then(data => {
      res.json(data);
    });
  });

  // display all users
  app.get("/api/newuser", (req, res) => {
    console.log("hit the api/newuser GET route");
    db.Users.findAll().then(data => {
      res.json(data);
    });
  });

  // create a new user
  app.post("/api/signup", function (req, res) {

    // Create a new instance of formidable to handle the request info
    var form = new formidable.IncomingForm();

    // parse information for form fields and incoming files
    form.parse(req, function (err, fields) {
      console.log(fields);

      db.Users.create({
        email: fields.email,
        password: fields.password,
        username: fields.username,
      }).then(function (userInfo) {
        // Upon successful signup, log user in
        req.login(userInfo, function (err) {
          if (err) {
            console.log(err)
            return res.status(422).json(err);
          }
          console.log(req.user);
          return res.json("/members");
        });
      }).catch(function (err) {
        console.log(err);
        res.status(422).json(err);
      });
    });

  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
        photo: req.user.photo
      });
    }
  });
};