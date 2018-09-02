import schedule from 'node-schedule';
import fetchData from '../startupgoa/fetchdata';
import parseData from './htmlParser';
import addData from './updateDatabase';

// fetch data everyday at 1 AM
const rule = '0 1 * * *'; 

//fetch data every 5 minutes
// const rule = '*/5 * * * * ';

const j = schedule.scheduleJob(rule, function () {
    console.log('Scheduler started!!');
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