require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);

const QuestionSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
  product_id: {type: Number, index: true},
  body: String,
  date_written: Date,
  asker_name: String,
  asker_email: String,
  reported: Boolean,
  helpful: Number
})

const PhotoSchema = new mongoose.Schema({
  id: Number,
  url: String
})

const AnswerSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
  question_id: Number,
  body: String,
  date_written: Date,
  answerer_name: String,
  answerer_email: String,
  reported: Boolean,
  helpful: Number,
  photos: [PhotoSchema],
})


var Question = mongoose.model('Question', QuestionSchema);
var Answer = mongoose.model('Answer', AnswerSchema);


module.exports.question = Question;
module.exports.answer = Answer;

