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


exports.addQuestion = (info, callback) => {
  db.Qid.findOneAndUpdate({name: 'Qid'}, { $inc: { id: 1 }})
  .then ((result) => {
    console.log(result, 'Qid findOneAndUpdate result');
    return result.id;
  })
  .then((id) => {
    var newQ = new db.question({
      id: id,
      product_id:  info.product_id,
      body: info.body,
      date_written: new Date(),
      asker_name: info.name,
      asker_email: info.email,
      reported: 0,
      helpful: 0,
    })
    return newQ.save();
  })
  .then(result => {
    callback(null, result);
  })
  .catch(err => {
    callback(err);
  });
}


exports.addAnswer = (info, callback) => {
  var getAid = db.Aid.findOneAndUpdate({name: 'Aid'}, { $inc: { id: 1 }});
  var getPid = db.Pid.findOneAndUpdate({name: 'Pid'}, { $inc: { id: info.photos.length }});

  Promise.all([getAid, getPid])
  .then(data => {
    var Aid = data[0].id;
    var Pid = data[1].id;

    var result = {
      Aid: Aid,
      Photos: []
    };

    for (let i = 0; i < info.photos.length; i++) {
      var photoWithId = {
        id: Pid,
        url: info.photos[i].url
      }
      result.Photos.push(photoWithId);
      Pid++;
    }
    return result;
  })
  .then((result) => {
    var newA = new db.answer({
      id: result.Aid,
      question_id:  info.question_id,
      body: info.body,
      date_written: new Date(),
      answerer_name: info.name,
      answerer_email: info.email,
      reported: 0,
      helpful: 0,
      photos: result.Photos
    })
    return newA.save();
  })
  .then(result => {
    callback(null, result);
  })
  .catch(err => callback(err))
}


exports.updateQHelpful = (id, callback) => {
  db.question.findOneAndUpdate({id: id}, { $inc: { helpful: 1 }})
  .then(result => {
    callback(null, result);
  })
  .catch(err => callback(err))
}

exports.updateQreport = (id, callback) => {
  db.question.findOneAndUpdate({id: id}, {reported: 1})
  .then(result => {
    callback(null, result);
  })
  .catch(err => callback(err))
}

exports.updateAHelpful = (id, callback) => {
  db.answer.findOneAndUpdate({id: id}, { $inc: { helpful: 1 }})
  .then(result => {
    callback(null, result);
  })
  .catch(err => callback(err))
}

exports.updateAreport = (id, callback) => {
  db.answer.findOneAndUpdate({id: id}, {reported: 1})
  .then(result => {
    callback(null, result);
  })
  .catch(err => callback(err))
}



