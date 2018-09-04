require('dotenv').config();
import BootBot from 'bootbot';
import User from '../models/User';
import Job from '../models/Job';
import log from '../logger';

const bot = new BootBot({
    accessToken: process.env.ACCESS_TOKEN,
    verifyToken: process.env.VERIFY_TOKEN,
    appSecret: process.env.APP_SECRET
});

bot.setGreetingText("Hello, I'm here to notify you about latest jobs posted on startup goa");

bot.setGetStartedButton((payload, chat) => {
    chat.say('Hello its Startup Goa job bot!!!');
    User.findOne({ user_id: payload.sender.id })
        .exec((err, result) => {
            if (err) {
                log.error(err.message)
            } else if (result.user_id != payload.sender.id) {
                let new_record = new User({
                    user_id: payload.sender.id
                });
                new_record.save()
                    .then(() => chat.say('You are subscribed now'))
                    .catch((err) => log.error(err.message))
            } else {
                chat.say('you are already subscribed!!')
            }
        })
});

bot.hear('latest jobs', (payload, chat) => {
    chat.say('Please wait till we fetch some latest jobs!!');
    Job.find({})
        .sort({ posted_date: 'desc' })
        .limit(5)
        .exec((err, jobs) => {
            if (err) {
                log.error(err.message);
                chat.say('Was not able to get the latest jobs!')
            } else {
                let msg = 'Top 5 Jobs are\n';
                jobs.forEach((value) => {
                    msg += "\nTitle : " + value.job_title;
                    msg += "\nType : " + value.job_type;
                    msg += "\nPosted On : " + value.posted_date.toDateString();
                    msg += "\nMore Info : " + value.job_link;
                    msg += "\n\n";
                });

                chat.say(msg);
            }
        })
});


bot.hear('subscribe', (payload, chat) => {
    User.findOne({ user_id: payload.sender.id })
        .exec((err, result) => {
            if (err) {
                log.error(err.message);
                chat.say('Something went wrong!!')
            } else if (result.user_id != payload.sender.id) {
                let new_record = new User({
                    user_id: payload.sender.id
                });
                new_record.save()
                    .then(() => chat.say('You are subscribed now'))
                    .catch(() => chat.say('Something went wrong'))
            } else {
                chat.say('you are already subscribed!!')
            }
        })
});

bot.hear(['hello', 'hey', 'sup'], (payload, chat) => {
    chat.say(`Hey , How are you today?`);
});

bot.hear('help', (payload, chat) => {
    chat.say('Here are the following commands for use.')
    chat.say("'latest jobs': Give top 5 latest jobs")
    chat.say("'subscribe': Automatically notify when a new job is posted")
})

bot.on('message', (payload, chat, data) => {
    if (!data.captured) {
        chat.say("I don't expect that!");
        chat.say("Please type 'help' to know command I understand!");

    }
});

export default bot;