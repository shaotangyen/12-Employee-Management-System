//const express = require('express');
const inquirer = require('inquirer');
const util = require('util');
const db = require("./config/connection");

//db functions
function viewAllDepartments() {
    db.query('SELECT * FROM departments', function (err, results) {
        console.log(results);
    });
    promptUser();
}

//List of prompt questions
const promptUser = async () => {
    return inquirer
        .prompt([
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
        ])
        .then((ans) => {
            switch (ans.choice) {
                case 'View All Departments':
                    viewAllDepartments();
                    break;
            }
        })
        .catch((err) => console.log(err));
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
    //db.query = util.promisify(db.query);
    promptUser();
}

init();