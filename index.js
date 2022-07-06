// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const {generateMarkdown} = require('./utils/generateMarkdown.js');
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
    },
    {
        type: 'confirm',
        name: 'addLicense',
        message: 'Do you want to an a license for your project?',
        default: true,
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose which type of license to include.',
        choices: ['MIT', 'GNU General Public License v3.0', 'Mozilla Public License 2.0', 'Apache License 2.0', 'Boost Software License 1.0', 'The Unlicense'],
        when: ({addLicense}) => {
            if (addLicense) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'Please enter your GitHub user name',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('A GitHub user name is required for the Questions section');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email for the Questions section',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('An email address is required for the Questions section');
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
                return;
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
    console.log(`
    ==========================
    Nickless Readmii Generator
    ==========================`);
    return inquirer.prompt(questions)
    .then(response => {
        //console.log(data);
        return generateMarkdown(response);
    })
    .then(markdown => {
        return writeToFile('README.md', markdown);
    })
    .then(resolve => {
        console.log(resolve);
    })
    .catch(err => {
        console.log(err);
    });
}

// Function call to initialize app
init();
