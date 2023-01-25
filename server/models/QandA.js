const db = require("../mongoDB.js");

exports.findQuestionByID = (id, callback) => {
  db.question.find({product_id: id, reported: 0})
  .then(result => {
    callback(null, result);
  })
  .catch(error => {
    callback(error);
  })

};

exports.findAnswerByID = (id, callback) => {
  db.answer.find({question_id: id, reported: 0})
  .then(result => {
    callback(null, result);
  })
  .catch(error => {
    callback(error);
  })
};

exports.findAnswerByArray = (array, callback) => {
  db.answer.find({question_id: {$in: array}, reported: 0})
  .then(result => {
    callback(null, result);
  })
  .catch(error => {
    callback(error);
  })
};



