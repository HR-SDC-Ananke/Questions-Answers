require("dotenv").config();
const mongoose = require("mongoose");

// mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@34.219.75.48:27017/${process.env.DB_NAME}`);

const QuestionSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
  product_id: {type: Number, index: true},
  body: String,
  date_written: Date,
  asker_name: String,
  asker_email: String,
  reported: Number,
  helpful: Number
})

const PhotoSchema = new mongoose.Schema({
  id: Number,
  url: String
})

const AnswerSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
  question_id:  {type: Number, index: true},
  body: String,
  date_written: Date,
  answerer_name: String,
  answerer_email: String,
  reported: Number,
  helpful: Number,
  photos: [PhotoSchema],
})

const QidSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
  name: String
})

const AidSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
  name: String
})

const PidSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
  name: String
})


var Question = mongoose.model('Question', QuestionSchema);
var Answer = mongoose.model('Answer', AnswerSchema);
var Qid = mongoose.model('Qid', QidSchema);
var Aid = mongoose.model('Aid', AidSchema);
var Pid = mongoose.model('Pid', PidSchema);

// var newQid = new Qid({id: 5000000, name: 'Qid'});

// newQid.save()
// .then (result => {
//   console.log(result, '==========Qid result')
// })
// .catch(error => console.log(error, '==========Qid error'))


// var newAid = new Aid({id: 8000000, name: 'Aid'});
// newAid.save()
// .then (result => {
//   console.log(result, '==========Aid result')
// })
// .catch(error => console.log(error, '==========Aid error'))

module.exports.question = Question;
module.exports.answer = Answer;
module.exports.Qid = Qid;
module.exports.Aid = Aid;
module.exports.Pid = Pid;

