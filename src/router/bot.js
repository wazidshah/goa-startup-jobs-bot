require('dotenv').config();
import BootBot from 'bootbot';
import User from '../models/User';
import Job from '../models/Job';

const bot = new BootBot({
    accessToken: process.env.ACCESS_TOKEN,
    verifyToken: process.env.VERIFY_TOKEN,
    appSecret: process.env.APP_SECRET
});

bot.setGreetingText("Hello, I'm here to notify you about latest jobs posted on startup goa");

bot.setGetStartedButton((payload, chat) => {
    chat.say('Hello its Startup Goa job bot!!!');
    User.findOne({ user_id: payload.sender.id })
        .then((result) => {
            console.log(result);
            if (result.user_id !== payload.sender.id) {
                let new_record = new User({
                    user_id: payload.sender.id
                });
                new_record.save().then(() => console.log('Record save!!'))

            }
        })
    BotUserId = payload.sender.id
});

bot.hear('latest jobs', (payload, chat) => {
    //chat.say('Please wait till we fetch some latest jobs!!');
    Job.find({})
        .limit(5)
        .exec((err, jobs) => {
            if (err) {
                chat.say('Was not able to get the latest jobs!')
            } else {
                let msg = 'Top 5 Jobs are \n';
                jobs.forEach((value) => {
                    msg += `
                    Title : ${value.job_title}
                    Type:${value.job_type}
                    Posted on:${value.posted_date.toDateString()}
                    More Info : ${value.job_link}

                    `
                });

                chat.say(msg);

            }
        })
});

bot.hear(['hello', 'hey', 'sup'], (payload, chat) => {
    chat.say(`Hey , How are you today?`);
});



export default bot;