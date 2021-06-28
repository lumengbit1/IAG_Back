import express from 'express';
import { numGuess, randomNum, hintGenerator } from '../modules/guess';
import _ from 'lodash';

let router = express.Router();
let result = {
  correct: false,
  highlight: [],
  hint: '',
  answer: '',
};
let random = randomNum();

let hint = hintGenerator(random);

let returnValue = new Array;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hint', function (req, res, next) {
  result.hint = hint;

  res.send(JSON.stringify(result));
})

router.post('/guess', function (req, res, next) {
  const { body } = req;

  if (_.join(hint, '') !== body.hint) {
    res.status(404).send(JSON.stringify({ error: 'hint not match' }));
  } else {
    returnValue.push(numGuess(body, random))
    res.send(JSON.stringify(returnValue));
  }
})

router.get('/reset', function (req, res, next) {
  random = randomNum();
  hint = hintGenerator(random);
  returnValue = new Array;
  res.send(JSON.stringify({ reset: 'ok' }));
})

export default router;
