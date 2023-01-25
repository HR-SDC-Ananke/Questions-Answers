const QandA = require("../models/QandA.js");

var transQandA = function(Pid, questions, answers) {
  var result = {
    product_id: Pid,
    results: []
  };
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].reported) {
      continue;
    }
    var Q = questions[i];
    var transQ = {
      "question_id": Q.id,
      "question_body": Q.body,
      "question_date": Q.date_written,
      "asker_name": Q.asker_name,
      "question_helpfulness": Q.helpful,
      "reported": Q.reported,
      "answers": {}
    };

    for (let j = 0; j < answers.length; j++) {
      if (answers[j].reported) {
        continue;
      }
      var A = answers[j];
      if (A.question_id === Q.id) {
        var transA = {
          "id": A.id,
          "body": A.body,
          "date": A.date_written,
          "answerer_name": A.answerer_name,
          "helpfulness": A.helpful,
          "photos": A.photos
        }
        transQ.answers[A.id] = transA;
      }
    }
    result.results.push(transQ);
  }
  return result;
}


exports.getQuestions = (req, res) => {
  // console.log(req.query.product_id, '=======req.params.product_id');
  QandA.findQuestionByID(req.query.product_id, (err, questions) => {
    if (err) {
      console.log(err, '==========findQuestionByID error');
      res.json(err);
    } else {
      // console.log(questions, '========findQuestionByID data');

      var page = Number(req.query.page || 1);
      var count = Number(req.query.count || 5);
      var startIndex = (page - 1) * count;
      var endIndex = startIndex + count - 1;

      var batch = [];
      var batchQ = [];
      for (let i = 0; i < questions.length; i++) {
        if (i < startIndex || i > endIndex) {
          continue;
        }
        batch.push(questions[i].id);
        batchQ.push(questions[i]);
      }

      QandA.findAnswerByArray(batch, (err, answers) => {
        if (err) {
          console.log(err, '=====findAnswerByArray error');
          res.json(err);
        } else {
          // console.log(answers, '========findAnswerByArray data');
          var transData = transQandA(req.query.product_id, batchQ, answers);
          res.json(transData);
        }
      })
    }
  });
};

exports.getAnswers = (req, res) => {
  QandA.findAnswerByID(req.params.qid, (err, data) => {
    if (err) {
      console.log(err, '==========findAnswerByID error');
    } else {
      // console.log(data, '========findAnswerByID data');
      var page = Number(req.query.page || 1);
      var count = Number(req.query.count || 5);
      var startIndex = (page - 1) * count;
      var endIndex = startIndex + count - 1;

      var transData = {
        "question": req.params.qid,
        "page": page,
        "count": count,
        "results": []
      }

      for (let i = 0; i < data.length; i++) {
        if (i < startIndex || i > endIndex) {
          continue;
        }
        var A = data[i];
        var transQ = {
          "answer_id": A.id,
          "body": A.body,
          "date": A.date_written,
          "answerer_name": A.answerer_name,
          "helpfulness": A.helpful,
          "photos": A.photos
        }
        transData.results.push(transQ);
      }

      res.json(transData);
    }
  });
};



// const QuestionSchema = new mongoose.Schema({
//   id: {type: Number, unique: true},
//   product_id: {type: Number, index: true},
//   body: String,
//   date_written: Date,
//   asker_name: String,
//   asker_email: String,
//   reported: Boolean,
//   helpful: Number
// })

// const PhotoSchema = new mongoose.Schema({
//   id: Number,
//   url: String
// })

// const AnswerSchema = new mongoose.Schema({
//   id: {type: Number, unique: true},
//   question_id: Number,
//   body: String,
//   date_written: Date,
//   answerer_name: String,
//   answerer_email: String,
//   reported: Boolean,
//   helpful: Number,
//   photos: [PhotoSchema],
// })
