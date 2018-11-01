$(document).ready(function () {
  //   console.log("hello!");
  let answerTotalArray = [];
  const Url = "/api/stats";

  $.ajax({
      method: "GET",
      url: Url,
    })
    .then(function (result) {
      // do math to update progress bars
      //   console.log(result);
      let quizQuestionTotals = [20, 31, 29, 29, 19, 20, 21];
      let percent = 0;
      let arrayPercent = [];
      //===========================================================================
      //this takes the quizID and pushes to an array
      var current = null; //quizid
      var cnt = 0;
      var obj = {}
      for (let i = 0; i < result.length; i++) {
        let quizID = result[i].quizId;
        answerTotalArray.push(quizID)
      }
      // console.log(answerTotalArray);
      //==================================================
      //this is to make an array of the counts of quiz ansers per quizId
      for (var i = 0; i < answerTotalArray.length; i++) {
        if (answerTotalArray[i] != current) {
          // console.log(answerTotalArray[i] + " " + "answerTotalArray");
          // console.log(current + " " + "");
          if (cnt > 0) {
            obj[current] = cnt;
            // console.log(obj[current] + " " + "obj-current");
            // console.log(cnt + " " + "cnt");
          }
          current = answerTotalArray[i];
          cnt = 1;
          // console.log(current + " " + "current");
          // console.log(cnt + " " + "cnt");
        } else {
          cnt++;
          // console.log(cnt + " " + "cnt");
        }
      }

      if (cnt > 0) {
        // document.write(current + ' comes --> ' + cnt + ' times');
        obj[current] = cnt;

      }
      // console.log(obj)
      var neware = []

      const keys = Object.keys(obj); //list of quizIDs
      // console.log(keys)
      for (let i = 0; i < 7; i++) {

        if (i + 1 in obj) {
          neware.push(obj[i + 1])
        } else {
          neware.push(0)
        }
      }
      console.log(neware)

      //to make the %
      for (let i = 0; i < neware.length; i++) {
        let answerTotal = neware[i];
        console.log(answerTotal + " " + "these are answer totals");
        let questionTotal = quizQuestionTotals[i];
        console.log(questionTotal + " " + "these are question totals");
        percent = Math.round((answerTotal / questionTotal) * 100);
        arrayPercent.push(percent);
        // console.log(arrayPercent);
      };

      let arrayQuiz = ["quiz1", "quiz2", "quiz3", "quiz4", "quiz5", "quiz6", "quiz7"];

      function loadHTML(arrayPercent) {
        console.log(arrayPercent);
        for (let j = 0; j < arrayQuiz.length; j++) {
          let quizName = arrayQuiz[j];
          console.log(quizName)
          console.log(arrayPercent[j])
          $("#" + quizName).attr({
            "style": "width: " + arrayPercent[j] + "%"
          });
          $("#" + quizName).attr({
            "aria-valuenow": arrayPercent[j] + "%"
          });
          $("#" + quizName).text(arrayPercent[j] + "%");
        };
      };


      loadHTML(arrayPercent)

    });

});