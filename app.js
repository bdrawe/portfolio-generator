const inquirer = require('inquirer');

inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name'
        }
    ])
    .then(answers => console.log(answers));
// const fs = require('fs');
// const generateNewPage = require('./src/page-template.js');


// fs.writeFile('./index.html', generateNewPage(name,github), err => {
//     if(err) throw err;

//     console.log('Portfolio complete! Check out index.html to see the output!');
// });