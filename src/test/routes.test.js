import "babel-polyfill"
const express = require("express");
const serverRoutes = require("../routes");
const request = require("supertest")("http://api.postcodes.io&quot");
const nock = require('nock');
import { numGuess, randomNum, hintGenerator } from '../modules/guess';


const app = express();
app.use("/hint", serverRoutes);

describe("testing-server-routes", () => {
  let random = randomNum();

  let hint = hintGenerator(random);

  let result = {
    correct: false,
    highlight: [],
    hint: '',
    answer: '',
  };

  it("GET /hint - success", async () => {
    nock("http://api.postcodes.io&quot")
      .get('/hint')
      .reply(200, result.hint = hint);

    const { body } = await request.get("/hint");
    expect(body).toEqual(hint);
  });

  // it("POST /guess - success", async () => {
  //   nock("http://api.postcodes.io&quot")
  //     .persist()
  //     .post('/guess', { username: 'pgte', password: /.+/i })
  //     .reply(200, { id: '123ABC' })

  //   const { body } = await request.post("/guess");
  //   expect(body).toEqual(hint);
  // });

  it("numGuess - correct", async () => {
    const result = numGuess({
      correct: false,
      highlight: [],
      hint: '',
      answer: '11111111',
    }, [1, 1, 1, 1, 1, 1, 1, 1])
    expect(result).toEqual({
      correct: true,
      highlight: [0, 1, 2, 3, 4, 5, 6, 7],
      hint: '',
      answer: '11111111',
    });
  });

  it("numGuess - correct", async () => {
    const result = numGuess({
      correct: false,
      highlight: [],
      hint: '',
      answer: '01111111',
    }, [1, 1, 1, 1, 1, 1, 1, 1])
    expect(result).toEqual({
      correct: false,
      highlight: [1, 2, 3, 4, 5, 6, 7],
      hint: '',
      answer: '01111111',
    });
  });
});