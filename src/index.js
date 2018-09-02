import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
require('dotenv').config();
// import BootBot from 'bootbot';
import bot from './router/bot';
import joblists from './models/Job';
const app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const dbUrl = process.env.DB_HOST;
mongoose.connect(dbUrl, { useNewUrlParser: true })
    .then(() => {
        console.log('Database connected');
    })
    .catch(err => console.log(err));

app.get('/', function (req, res) {
    joblists.find({})
        .limit(5)
        .exec((err, jobs) => {
            console.log(jobs);
            console.log(err);
            if (err) {
                chat.say('Was not able to get the latest jobs!')
            } else {
                let msg = 'Top 5 Jobs are \n';
                jobs.forEach((value) => {
                    msg += `Title : ${value.job_title}
                 Type:${value.job_type}
                 Postedon:${value.posted_date.toString('dd-mm-yyyy')}
                 More Info : ${value.job_link}

                `
                });

                res.send(msg);

            }
        })
})

app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
        return res.send(req.query['hub.challenge'])
    }
    res.send('wrong token')
})

app.listen(app.get('port'), function () {
    console.log('Started on port', app.get('port'))
})


bot.start();

