//const express = require('express');
const inquirer = require('inquirer');
const { inherits } = require('util');
const db = require("./config/connection");

// const PORT = process.env.PORT || 3001;
// const app = express();

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

//db created
function doChoice(ans) {
    console.log(ans.choice);
    switch (ans.choice) {
        case 'View All Departments':
            viewAllDepartments();
            break;
    }
}

//db functions
function viewAllDepartments() {
    db.query('SELECT * FROM departments', function (err, results) {
        console.log(results); // need to print this out in a table format
    });
    //init();
}

//List of prompt questions
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What do you want to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'Quit',
            ],
        }
    ]);
}

// to do
// View All Departments
//  -> table showing IDs, Department
// View All Roles
//  -> table showing IDs, Title, Department, Salary
// View All Employees
//  -> table showing IDs, First Name, Lat Name, Title, Department, Salary, Manager
// Add Department
//  -> Enter name of department, adding department to the db
// Add Role
//  -> Enter name, salary, department, adding role to the db
// Add Employee
//  -> Enter first name, last name, role, manager, adding employee to the db
// Update Employee Role
//  -> promtp to select an employee from list of all employes
//     to update their new role, updating this info to the db
// Quit

function init() {
    console.log("Welcome to the Employee Tracker System.");
    promptUser()
        .then((ans) => doChoice(ans))
        .catch((err) => console.log(err));
}

init();