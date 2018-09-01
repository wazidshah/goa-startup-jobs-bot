const cheerio = require('cheerio');
const fs = require('fs');


let html = fs.readFileSync('test.html', 'utf-8');

const $ = cheerio.load(html, {
    normalizeWhitespace: true
})

$('li[id^="job_listing"]').each(function (i, elm) {
    console.log(i);
    
    if (i < 4) {
        // console.log($(this)); // for testing do text()
        let $time = $(this).find('ul.meta>li.date');
        // fs.writeFile('op.txt',$time.text().trim());
        // console.log($time.text().trim());
         
    }
});