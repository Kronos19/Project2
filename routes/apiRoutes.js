//todo: add error handling to routes?
// 1x3-2x0-3x4-4x2
var formidable = require('formidable');
var db = require("../models");
var passport = require("passport");
const Op = require("sequelize").Op;

module.exports = function (app) {
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

  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    console.log(req.user);
    console.log("hi");
    res.json("/stats");
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
          return res.json("/stats");
        });
      }).catch(function (err) {
        console.log(err);
        res.status(422).json(err);
      });
    });
  });

  function insert(str, n) {
    if (str == "" || str == null) return n.toString();
    const pieces = str.split("-");
    let i = 0;
    while (n > parseInt(pieces[i])) {
      i++;
    }
    if (parseInt(pieces[i]) == n) return str;
    pieces.splice(i, 0, n);
    return pieces.join("-");
  }

  app.post("/api/questions/result", (req, res) => {
    if (req.body.result == "correct") {
      db.Users.findOne({
        where: {
          id: req.user.id
        }
      }).then(data => {
        console.log(data.username);
        console.log(data.correct);
        const updatedString = insert(data.correct, req.body.id);
        db.Users.update({
          correct: updatedString
        }, {
          where: {
            id: req.user.id
          }
        }).then((d2) => {
          res.json({
            msg: "yup!"
          });
        }).catch(err1 => {
          console.log(err1);
        })
      }).catch(err => {
        console.log(err);
      });
    } else {
      res.json({
        msg: "sorry!"
      });
    }
  });

  //for the progress bar data
  app.get("/api/stats", function (req, res) {
    // queried correct answers
    db.Users.findOne({
        where: {
          id: req.user.id
        },
        attributes: ["correct"]
      })
      .then(function (correctAnswers) {
        // console.log(correctAnswers);
        //find out calc for total quiz # for then calc of %'s below
        const correct = correctAnswers.correct.split("-");
        console.log(correct);
        return db.Questions.findAll({
          attributes: ["quizId"],
          where: {
            id: {
              [Op.or]: correct
            }
          }
        });
      })
      .then(function (questionQuizIds) {
        //======================
        console.log(questionQuizIds);
        res.json(questionQuizIds);
      })
      .catch(function (err) {
        console.log(err);
        res.json(err);
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
        username: req.user.username,
      });
    }
  });
};