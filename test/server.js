const server = require("../server/index.js");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe('Questions and Answers', () => {

  describe('Test GET route /questions', () => {

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
          response.body.results.length.should.be.eq(4);

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



})