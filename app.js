
import { writeFile, copyFile } from './utils/generate-site.js';
import generateNewPage from './src/page-template.js';

import { prompt } from 'inquirer';

const promptUser = () => {
    return prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                return true;
                } else {
                console.log('Please enter your name!');
                return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is your GitHub Username',
            validate: gitHubUserName => {
                if (gitHubUserName) {
                return true;
                } else {
                console.log('Please enter your GitHub Username!');
                return false;
                }
            }
        },
        {
            type: 'confirm',
            name:'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({confirmAbout}) => {
                if(confirmAbout){
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};
const promptProject = portfolioData => {
    if(!portfolioData.projects){
        portfolioData.projects = [];
    }
    
    console.log(`

    =================
    Add a New Project
    =================
    `);
    return prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project? (Required)',
            validate: projectName => {
                if (projectName) {
                return true;
                } else {
                console.log('Please enter your project name');
                return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project. (Required)',
            validate: projDescription => {
                if (projDescription) {
                return true;
                } else {
                console.log('Please give a description on your project!');
                return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML','CSS','ES6','jQuery','Bootstrap','Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project (Required)',
            validate: projLink => {
                if (projLink) {
                return true;
                } else {
                console.log('Please enter a valid URL of your project!');
                return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }  
        ])  
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if(projectData.confirmAddProject){
                return promptProject(portfolioData);
            } else {
                return portfolioData;
            }
        })   
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generateNewPage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
      console.log(writeFileResponse);
      return copyFile();
  })
  .then(copyFileResponse => {
      console.log(copyFileResponse);
  })
  .catch(err => {
      console.log(err);
  });






