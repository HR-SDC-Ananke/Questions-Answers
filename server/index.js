const express = require('express');
const controllerQ = require('./controllers/questions.js');

const app = express();

app.use(express.json());


app.get('/questions', controllerQ.getQuestions);
app.get('/questions/:qid/answers', controllerQ.getAnswers);



app.listen(3001);