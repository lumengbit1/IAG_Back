import _ from 'lodash';

export function randomNum() {
  let arr = new Array();

  function getRandom(min, max) {
    let random = Math.random() * (max - min) + min;
    random = Math.floor(random);

    if (arr.length < 10) {
      for (let i = 0; i <= arr.length; i++) {
        if (random == arr[i]) {
          break;
        }
        else {
          if (i == arr.length) { arr.push(random); break; }
        }
      };
      getRandom(0, 10);
    }
  }

  getRandom(0, 10);

  return arr.slice(0, 8);
}

export function hintGenerator(random) {
  const hint = _.sortBy(random);

  return hint;
}

export function numGuess(body, random) {
  let result = {
    correct: false,
    highlight: [],
    hint: '',
    answer: '',
  };
  let highLight = new Array;
  const inputValue = _.split(body.answer, '');
  random.forEach((item, index) => {
    if (_.toString(item) === _.toString(inputValue[index])) {
      highLight.push(index);
    }
  })

  if (highLight.length === 8) {
    result.correct = true;
  }

  result.answer = body.answer;
  result.highlight = highLight;
  return result;
}