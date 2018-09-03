import mongoose from 'mongoose';
require('dotenv').config();
import bot from './router/bot';
import scheduleTask from './schedule/index';
import log from './logger';

const dbUrl = process.env.DB_HOST;
mongoose.connect(dbUrl, { useNewUrlParser: true })
    .then(() => {
        log.info('Connected to database!!');
        scheduleTask.invoke();
    })
    .catch(err => log.error(err.message));


bot.start();

