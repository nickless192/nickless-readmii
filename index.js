// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const {renderLicenseBadge, renderLicenseLink, renderLicenseSection, generateMarkdown} = require('./utils/generateMarkdown.js');
// const { default: test } = require('node:test');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter a title for the project.*',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('Please enter the project name.')
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter the description for the project.*',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('Please enter the project description.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Enter the installation process to use your application.*',
        validate: installationInput => {
            if (installationInput) {
                return true;
            } else {
                console.log('Please enter the application installation process.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message:  'Enter how to use your project.*',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Please enter the steps on how to use your application.')
            }
        }
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'How can users contribute to your project?*',
        validate: contributingInput => {
            if (contributingInput) {
                return true;
            } else {
                console.log('Please enter contribution instructions.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'test',
        message: 'How to test application?*',
        validate: testInput => {
            if (testInput) {
                return true;
            } else {
                console.log('Please enter how steps to test your application.');
                return false;
            }
        }
    }

];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(`./dist/${fileName}`, data, err => {
            if (err) {
                reject (err);
                return
            }
            resolve({
                ok: true,
                message: `File ${fileName} created successfully`
            });
        });
    });
};

// TODO: Create a function to initialize app
function init() {
    return inquirer.prompt(questions)
    .then(response => {
        //console.log(data);
        return generateMarkdown(response);
    })
    .then(markdown => {
        writeToFile('readme.md', markdown);
    });
}

// Function call to initialize app
init();

// const testFileName = 'readme.md';
// const testData = 'info on readme and stuff';

// writeToFile(testFileName, testData)
// .then(response => {
//     console.log(response);
// })
// .catch(err => {
//     console.log(err);
// })
