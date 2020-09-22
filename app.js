const profileDataArgs = process.argv.slice(2, process.argv.length);
const [name, github] = profileDataArgs;
const fs = require('fs');
const generateNewPage = require('./src/page-template.js');


fs.writeFile('index.html', generateNewPage(name,github), err => {
    if(err) throw err;

    console.log('Portfolio complete! Check out index.html to see the output!');
});