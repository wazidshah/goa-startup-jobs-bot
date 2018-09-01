/**
 * @file fetechdata.js
 * @author : Nitesh Sawant
 * @description : This file makes http call to startup goa and fetches latest jobs
 */
import { post } from 'request';

const fetchData = {
    url: "",
    getData: () => {
        post({
            uri: "http://startupgoa.org/jm-ajax/get_listings/",
            headers: {
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*',
                'DNT': '1',
                'Referer': 'http://startupgoa.org/jobs/',
                'Accept-Language': 'en-US,en;q=0.9',
                'Origin': 'http://startupgoa.org',
                'X-Requested-With': 'XMLHttpRequest'

            },
            form: {
                'per_page': '100',
                'orderby': 'latest',
                'order': 'DESC',
                'page': '1',
                'show_pagination': 'false'
            }
        }, (err, httpResponse, body) => {
            body = JSON.parse(body);
            console.log(body.html);

        })
    }
}



export default {
    getData: fetchData.getData
};