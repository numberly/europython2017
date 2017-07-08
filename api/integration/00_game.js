let request = require('superagent');
let expect  = require('chai').expect;
let md5 = require('md5');


const URI = "http://localhost:8888/api";

describe('Game scenario', () => {

  describe('Init quizz', () => {
    it ("200: get quizz", (done) => {
     request
      .get(URI + '/questions')
      .set('Content-Type', 'application/json')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        // not a nice answer
        expect(res.body).to.exist;
        expect(res.body).to.be.an('array');
        done();
      });
    });
  }); // !GET_USER

  describe('Get user', () => {
    it ("404: doesn't exist", (done) => {
     request
      .get(URI + '/users/' + md5('email@email.qwe'))
      .set('Content-Type', 'application/json')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  }); // !GET_USER

  describe('Register user', () => {
    it ("200: register user", (done) => {
     request
      .post(URI + '/users')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({
        email: 'email@email.qwe',
        name: 'Paul',
        cool: false,
        country: 'France'
      }))
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.cool).to.equal(false);
        expect(res.body.email).to.equal('email@email.qwe');
        expect(res.body.name).to.equal('Paul');
        done();
      });
    });
  }); // !REGISTER_USER

  describe('Verify user', () => {
    it ("200: get user", (done) => {
     request
      .get(URI + '/users/' + md5('email@email.qwe'))
      .set('Content-Type', 'application/json')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        // expect(res.body.scores).to.exist;
        done();
      });
    });
  }); // !GET_USER


  describe('Get user score', () => {
    it ("200: user should exist", (done) => {
     request
      .get(URI + '/users/' + md5('email@email.qwe'))
      .set('Content-Type', 'application/json')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        // expect(res.body.scores).to.exist;
        done();
      });
    });
  }); // !GET_USER

}) // !GAME SCENARIO
