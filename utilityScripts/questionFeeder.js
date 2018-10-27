const fs = require("fs");
const request = require("request");

const url = "http://localhost:3000/api/newquest";



const topics = [
  "console/bash",
  "html/css/git",
  "javascript",
  "javascript & jQuery",
  "JS-Timers & APIs",
  "Node",
  "Express"
];

function readAndParseQuiz(quizNumber, topic) {
  let fp = "../sourceQuizzes/quiz" + quizNumber + ".md";
  fs.readFile(fp, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }
    const chunks = data.split("###");
    for (let i = 0; i < chunks.length; i++) {
      const qObj = {
        quizId: quizNumber,
        category: topic,
        codeBlock: null
      };
      // remove if statement and start incrementer at 1?
      if (chunks[i].split(":question: ")[1]) {
        let qas = chunks[i].split(":question: ")[1]; // question & answers
        if (qas.includes("```")) {
          let tmp = qas.split("```");
          qObj.codeBlock = tmp[1];
          qas = tmp[0] + tmp[2];
        }
        qas = qas.split("\n");
        qObj.question = qas[0].trim();
        let ct = 1;
        for (let j = 1; j < 5; j++) {
          if (qas[j].includes(":white_check_mark:")) {
            qObj.correct = qas[j].split(":white_check_mark:")[0].trim();
          } else {
            qObj["incorrect" + ct] = qas[j].trim();
            ct++;
          }
        }
        console.log(qObj);
        request.post(url).form(qObj);
      }
    }
  });
}

for (let i = 1; i < 8; i++) {
  readAndParseQuiz(i, topics[i]);
}
