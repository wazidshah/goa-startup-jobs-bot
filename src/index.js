import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
require('dotenv').config();
import bot from './router/bot';
import joblists from './models/Job';
import scheduleTask from './schedule/index';


const dbUrl = process.env.DB_HOST;
mongoose.connect(dbUrl, { useNewUrlParser: true })
    .then(() => {
        console.log('Database connected');
        scheduleTask.invoke();
    })
    .catch(err => console.log(err));


bot.start();

