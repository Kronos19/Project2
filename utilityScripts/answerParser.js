const testInput = "1x3-2x3-3x2-4x1-5x3-6x4-7x2-8x2-9x3-10x0";

function parseAnswerString(s) {
  const out = [];
  const pieces = s.split("-");
  for (let i = 0; i < pieces.length; i++) {
    const bits = pieces[i].split("x");
    out.push({
      questionNumber: parseInt(bits[0]),
      timesAnswered: parseInt(bits[1])
    });
  }
  return out;
}

console.log(parseAnswerString(testInput));

module.exports = parseAnswerString;
