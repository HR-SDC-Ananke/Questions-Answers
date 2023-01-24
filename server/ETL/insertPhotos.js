const db = require("../mongoDB.js");
const fs = require("fs");
const { parse } = require("csv-parse");

const stream = fs.createReadStream("./server/data/answers_photos.csv");
const rl = stream.pipe(parse({ delimiter: ",", from_line: 2 }));

var count = 0;

var insertPhotos = async function(buffer, bulkSize) {
  await db.answer.bulkWrite(buffer)
  .then(result => {
    count += bulkSize;
    console.log('photos insert: ', count , '   date: ', new Date());
  })
  .catch(error => console.log(error, '=======bulkWrite error'));
}

const start = async () =>{
  var bulkSize = 10000;
  var buffer = [];
  for await (const row of rl) {
    var update = {
      updateOne: {
        filter: { id: row[1] },
        update: {$push: {photos: {id: row[0], url: row[2]}}},
        upsert: true
      }
    };
    buffer.push(update);

    if (buffer.length === bulkSize) {
      await insertPhotos(buffer, bulkSize);
      buffer = [];
    }
  }
  if (buffer.length !== 0) {
    await insertPhotos(buffer, buffer.length);
  }
}

start();