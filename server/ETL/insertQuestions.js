const db = require("./mongoDB.js");
const fs = require("fs");
const { parse } = require("csv-parse");

const Qstream = fs.createReadStream("./server/data/questions.csv");
const Qrl = Qstream.pipe(parse({ delimiter: ",", from_line: 2 }));

var insertMany = async function(buffer, i) {
  await db.QandA.insertMany(buffer)
  .then(result => {
     // console.log(result, '===========save new question result');
     // res.json(`save new word [${result.keyword}] success!`);
     console.log('imported data number: ', i, '   current time: ',new Date());
   })
   .catch(err => {
     console.log('--- start error ---', buffer[0], err,'--- save new question error ---');
     throw new Error();
   });
}


const start = async () =>{
  let batchSize = 10000;
  let i = 0;
  let buffer = [];
  for await (const rowQ of Qrl) {
    buffer.push({
        id: rowQ[0],
        product_id: rowQ[1],
        body: rowQ[2],
        date_written: rowQ[3],
        asker_name:rowQ[4],
        asker_email: rowQ[5],
        reported: rowQ[6],
        helpful: rowQ[7],
        answers: []
    })
    i++;
    if (i % batchSize === 0) {
      await insertMany(buffer, i);
      buffer = [];
    }
  }

  if (buffer.length !== 0) {
    await insertMany(buffer, i);
  }
}

start();

