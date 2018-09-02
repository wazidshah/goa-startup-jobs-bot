import moment from 'moment';
import JobList from '../models/Job';


function addData(data) {
    return new Promise((resolve, reject) => {
        let temp;
        let insert_data = data.map((elem) => {
            temp = elem.posted_date.split(" ");
            elem.posted_date = moment().subtract(parseInt(temp[0]), temp[1]).toDate();
            elem.is_notified = true;
            return elem;
        });

        JobList
            .find({})
            .select('job_id')
            .limit(10)
            .exec((err, data) => {
                if (err) {
                    reject(err)
                }
                let jobIds = data.map(a => a.job_id);
                let filtered_insert_data = insert_data.filter((job) => {
                    return !jobIds.includes(job.job_id);
                });
                console.log(filtered_insert_data);
                if (filtered_insert_data.length > 0) {
                    JobList.insertMany(insert_data).then((err, docs) => {
                        if (err) {
                            console.log(err);
                        }
                        resolve(docs);
                    })
                }else{
                    resolve('Nothing to update');
                }
            })
    })

}

export default addData;