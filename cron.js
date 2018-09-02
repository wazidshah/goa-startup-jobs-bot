const schedule = require('node-schedule');
// const rule = '0 1 * * *';
const rule = '* * * * * ';

var j = schedule.scheduleJob(rule, function(){
    console.log('The answer to life, the universe, and everything!');
  });
