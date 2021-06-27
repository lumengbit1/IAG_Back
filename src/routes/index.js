import express from 'express';
import numGuess from '../modules/guess';

let router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/guess', function (req, res, next) {
  console.log('test')
  const { query } = req;
  res.send(numGuess(query));
})
router.get(
  '/middleware',
  function (req, res, next) {
    res.level = 1;
    next();
    res.send(`第${res.level}层！`)
  },
  function (req, res) {
    res.level = 2;
  }
)

export default router;
