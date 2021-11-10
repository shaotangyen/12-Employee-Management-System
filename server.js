const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const { inherits } = require('util');

const PORT = 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//Connect to database
// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         database: 'company_db'
//     },
//     console.log('Connected to the company_db database')
// );

//List of prompt questions
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'to-do',
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
        .then((ans) => console.log(ans))
        .catch((err) => console.log(err));
}

init();