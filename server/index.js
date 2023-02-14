const express = require('express');
const controllerQ = require('./controllers/questions.js');

const app = express();

app.use(express.json());

app.get('/questions', controllerQ.getQuestions);
app.get('/questions/:qid/answers', controllerQ.getAnswers);

app.post('/questions', controllerQ.addQuestion);
app.post('/questions/:qid/answers', controllerQ.addAnswer);

app.put('/questions/:qid/helpful', controllerQ.changeQHelpful);
app.put('/questions/:qid/report', controllerQ.reportQ);
app.put('/answers/:aid/helpful', controllerQ.changeAHelpful);
app.put('/answers/:aid/report', controllerQ.reportA);

app.get('/loaderio-07595a0b7626c465daf47c862c716978/', (req, res) => {
  res.json('loaderio-07595a0b7626c465daf47c862c716978');
});

module.exports = app.listen(3001);
