require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const moment = require('moment');
const JobList = require('./src/models/Job');

// console.log(process.env);
const dbUrl = process.env.DB_HOST;
console.log(dbUrl);

mongoose.connect(dbUrl, { useNewUrlParser: true })
    .then(() => {
        console.log('Database connected');
        addData();
    })
    .catch(err => console.log(err));


function addData() {
    let data = JSON.parse(fs.readFileSync('output.json', 'utf-8'));
    let insert_data = data.map((elem) => {
        temp = elem.posted_date.split(" ");
        elem.posted_date = moment().subtract(parseInt(temp[0]), temp[1]).toDate();
        elem.is_notified = true;
        return elem;
    });

  JobList.insertMany(insert_data).then((err,docs)=>{
    if(err){
        console.log(err);
    }
    console.log(docs);
    mongoose.disconnect();
  })
}
