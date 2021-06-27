let randomNum = parseInt(Math.random() * 100);
let guessCount = 0;

function numGuess(query) {
  const guessNumber = Number(query.guessNumber || -1);
  let sendValue = '';
  if (guessNumber !== -1) {
    guessCount++;
    if (randomNum === guessNumber) {
      sendValue = `yes,猜了${guessCount}遍,数字已经重置！`;
      randomNum = parseInt(Math.random() * 100);
      guessCount = 0;
      console.log('randomNum', randomNum);
    }
    if (randomNum >= guessNumber) {
      sendValue = 'too small';
    }
    if (randomNum <= guessNumber) {
      sendValue = 'too big';
    }
  }

  return sendValue;
}

export default numGuess;