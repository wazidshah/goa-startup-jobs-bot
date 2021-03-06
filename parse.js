const cheerio = require('cheerio');
const fs = require('fs');


let html = fs.readFileSync('test.html', 'utf-8');

const $ = cheerio.load(html, {
    normalizeWhitespace: true
})

let op = [];
$('li[id^="job_listing"]').each(function (i, elm) {
    op.push({
        job_id: $(this).attr('id').replace('job_listing-', ''),
        job_title: $(this).attr('data-title'),
        job_type: $(this).find('ul.meta>li.job-type').text().trim(),
        job_link: $(this).attr('data-href'),
        posted_date: $(this).find('ul.meta>li.date')
            .text()
            .replace(/Posted|ago/gi, '')
            .trim()
    })
});

// console.log(op);

let jsonContent = JSON.stringify(op, null, 4);

fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }

    console.log("JSON file has been saved.");
});