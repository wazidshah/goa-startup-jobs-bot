require('dotenv').config();
import BootBot from 'bootbot';

const bot = new BootBot({
    accessToken: process.env.ACCESS_TOKEN,
    verifyToken: process.env.VERIFY_TOKEN,
    appSecret: process.env.APP_SECRET
});

bot.setGreetingText("Hello, I'm here to notify you about latest jobs posted on startup goa");

bot.setGetStartedButton((payload, chat) => {
        chat.say('Hello its Nitesh Sawant');
    
    BotUserId = payload.sender.id
});

bot.hear(['hello', 'hey', 'sup'], (payload, chat) => {
    chat.say(`Hey , How are you today?`);
});



export default bot;