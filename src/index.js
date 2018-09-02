import express from 'express';
import bodyParser from 'body-parser';
require('dotenv').config();
// import BootBot from 'bootbot';
import bot from './router/bot';
const app = express();

app.set('port', (process.env.PORT || 5000));
console.log(process.env.PORT);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send("hey there boi")
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

