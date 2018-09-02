import schedule from 'node-schedule';
import cheerio from 'cheerio';
import fetchData from '../startupgoa/fetchdata';
import parseData from './htmlParser';
import addData from './updateDatabase';
// const rule = '0 1 * * *';
const rule = '*/5 * * * * ';

const j = schedule.scheduleJob(rule, function () {
    console.log('Scheduler started!!');
    let html = '';
    fetchData.getData()
        .then((html) => {
            parseData(html)
                .then((josnData) => {
                    addData(josnData)
                        .then((msg) => console.log(msg))
                        .catch(() => console.log('failer'))
                })
        })
        .catch((err) => console.log(err))
});

export default j;