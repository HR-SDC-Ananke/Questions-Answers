const server = require("../server/index.js");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe('Questions and Answers', () => {

  describe('Test GET route /questions and /questions/:question_id/answers', () => {

    it('it should return all questions by product id', (done) => {
      chai.request(server)
        .get('/questions?product_id=1')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');

          response.body.should.have.property('product_id');
          response.body.product_id.should.be.eq('1');

          response.body.should.have.property('results');
          response.body.results.should.be.a('array');
          response.body.results.length.should.not.be.eq(0);

          response.body.results[0].should.have.property('question_id');
          response.body.results[0].should.have.property('question_body');
          response.body.results[0].should.have.property('question_date');
          response.body.results[0].should.have.property('asker_name');
          response.body.results[0].should.have.property('question_helpfulness');
          response.body.results[0].should.have.property('reported');
          response.body.results[0].should.have.property('answers');

          response.body.results[0].answers.should.be.a('object');
          done();
        })
    })

    it('it should return all answers by question id', (done) => {
      chai.request(server)
        .get('/questions/1/answers')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');

          response.body.should.have.property('question');
          response.body.question.should.be.eq('1');
          response.body.should.have.property('page');
          response.body.should.have.property('count');

          response.body.should.have.property('results');
          response.body.results.should.be.a('array');
          response.body.results.length.should.be.eq(5);

          response.body.results[0].should.have.property('answer_id');
          response.body.results[0].should.have.property('body');
          response.body.results[0].should.have.property('date');
          response.body.results[0].should.have.property('answerer_name');
          response.body.results[0].should.have.property('helpfulness');
          response.body.results[0].should.have.property('photos');

          response.body.results[0].photos.should.be.a('array');
          done();
        })
    })

  })

  describe('Test POST route /questions and /questions/:question_id/answers', () => {

    it('it should post a question', (done) => {
      var question = {
        product_id: 1,
        body: 'test_body',
        name: 'test_name',
        email: 'test_email'
      };

      chai.request(server)
        .post('/questions')
        .send(question)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.eq('CREATED');

          done();
        })
    })

    it('it should post an answer', (done) => {
      var answer = {
        body: 'test_body',
        name: 'test_name',
        email: 'test_email',
        photos:[{url: "test_url_one"}, {url: "test_url_two"}]
      };

      chai.request(server)
        .post('/questions/2/answers')
        .send(answer)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.eq('CREATED');

          done();
        })
    })

  })

  describe('Test PUT route /questions/:question_id/helpful and /questions/:question_id/report', () => {
    it('it should put question helpful', (done) => {

      chai.request(server)
        .put('/questions/2/helpful')
        .end((err, response) => {
          response.should.have.status(204);
          response.body.should.be.a('object');

          done();
        })
    })

    it('it should put question reported', (done) => {

      chai.request(server)
        .put('/questions/2/report')
        .end((err, response) => {
          response.should.have.status(204);
          response.body.should.be.a('object');

          done();
        })
    })
  })

  describe('Test PUT route /answers/:answer_id/helpful and /answers/:answer_id/report', () => {
    it('it should put answer helpful', (done) => {

      chai.request(server)
        .put('/answers/2/helpful')
        .end((err, response) => {
          response.should.have.status(204);
          response.body.should.be.a('object');

          done();
        })
    })

    it('it should put answer reported', (done) => {

      chai.request(server)
        .put('/answers/2/report')
        .end((err, response) => {
          response.should.have.status(204);
          response.body.should.be.a('object');

          done();
        })
    })
  })



})