require('dotenv').config();
import BootBot from 'bootbot';
import User from '../models/User';
import Job from '../models/Job';
import log from '../logger';


function notify() {

    const bot = new BootBot({
        accessToken: process.env.ACCESS_TOKEN,
        verifyToken: process.env.VERIFY_TOKEN,
        appSecret: process.env.APP_SECRET
    });

    User
        .find({})
        .exec((err, users) => {
            if (err) {
                log.error(err.message);
            }
            // get the latest jobs which are not notified

            Job
                .find({ is_notified: false })
                .exec((err, jobs) => {
                    if (err) {
                        log.error(err.message);
                    }

                    if (!jobs.length == 0) {
                        let msg = 'Latest Jobs are \n';
                        jobs.forEach((value) => {
                            msg += "\nTitle : " + value.job_title;
                            msg += "\nType : " + value.job_type;
                            msg += "\nPosted On : " + value.posted_date.toDateString();
                            msg += "\nMore Info : " + value.job_link;
                            msg += "\n\n";
                        });
                        users.forEach((user) => {
                            bot.sendTextMessage(user.user_id, msg);
                        });

                        // update all the records is_notifed to true

                        Job.update({ is_notified: false },
                            { is_notified: true },
                            { multi: true }, (err, res) => {
                                if (err) {
                                    log.error(err.message);
                                } 
                            })
                    }
                })
        })

}


export default notify;