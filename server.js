//const express = require('express');
const { CONNREFUSED } = require('dns');
const inquirer = require('inquirer');
const util = require('util');
const db = require("./config/connection");
const cTable = require('console.table');


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
                case 'View All Roles':
                    viewAllRoles();
                    break;
                case 'View All Employees':
                    viewAllEmpolyees();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployee();
                    break;
                case 'Quit':
                    process.exit(0);
            }
        })
        .catch((err) => console.log(err));
}

async function viewAllDepartments() {
    let [data] = await db.query("SELECT * FROM departments ORDER BY id ASC");
    console.table(data);
    promptUser();
}

async function viewAllRoles() {
    let [data] = await db.query(
        `SELECT roles.id, roles.title, departments.department_name AS department, roles.salary 
        FROM roles JOIN departments
        ON roles.department_id = departments.id
        ORDER BY roles.id ASC
        `);
    console.table(data);
    promptUser();
}

async function viewAllEmpolyees() {
    let [data] = await db.query(
        `SELECT employees.id, employees.first_name, employees.last_name, roles.title AS title, departments.department_name, roles.salary, employees.manager_id as manager
        FROM employees
        INNER JOIN roles ON employees.role_id = roles.id
        INNER JOIN departments ON roles.department_id = departments.id
        ORDER BY employees.id ASC
        `
        //LEFT JOIN employees ON employees.manager_id = employees.id
    );
    console.table(data);
    promptUser();
}

async function addDepartment() {
    await inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: "What's the department name?",
        }
    ]).then((ans) => {
        db.query(`INSERT INTO departments (department_name) VALUE ("${ans.department}")`);
        console.log(`Department ${ans.department} has been added`);
    });
    promptUser();
}

async function addRole() {
    let [departments] = await db.query("SELECT department_name FROM departments");
    await inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: "What's the title of the role?",
        },
        {
            type: 'input',
            name: 'salary',
            message: "What's the salary of the role?",
        },
        {
            type: 'list',
            name: 'department',
            message: "What's the department of the role?",
            choices: departments.map((dep) => dep.department_name),
        }
    ]).then(async (ans) => {
        let [[depId]] = await db.query(`SELECT id FROM departments where department_name = "${ans.department}"`);
        await db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${ans.role}", "${ans.salary}", ${depId.id})`);
        console.log(`Role ${ans.role} has been added`);
    });
    promptUser();
}

async function addEmployee() {
    let [roles] = await db.query(`SELECT * FROM roles`);
    let [managers] = await db.query(`SELECT * FROM employees`);
    await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What's the employee's first name?",
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What's the employee's last name?",
        },
        {
            type: 'list',
            name: 'role',
            message: "What's the employee's role?",
            choices: roles.map((role) => {
                return {
                    name: role.title,
                    value: role.id
                };
            }),
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who's the employees's manager?",
            choices: () => {
                const managerList = [{ name: "None", value: "null" }];
                managers.forEach((manager) => {
                    managerList.push({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id });
                });
                return managerList;
            },
        }
    ])
        .then(async (ans) => {
            await db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${ans.firstName}", "${ans.lastName}", ${ans.role}, ${ans.manager})`);
            console.log(`Employee ${ans.firstName} ${ans.lastName} has been added`);
        })
        .catch((err) => console.log(err));

    promptUser();
}

// to do
// Update Employee Role
//  -> promtp to select an employee from list of all employes
//     to update their new role, updating this info to the db
async function updateEmployee() {
    let [employees] = await db.query(`SELECT * FROM employees`);
    let [roles] = await db.query(`SELECT * FROM roles`);
    await inquirer.prompt([
        {
            type: 'list',
            name: 'employees',
            message: "Which employee would you like to update?",
            choices: employees.map((emp) => {
                return `${emp.first_name} ${emp.last_name}`
            }),
        },
        {
            type: 'list',
            name: 'roles',
            message: "Which role do you want to assign to the selected employee?",
            choices: roles.map((role) => {
                console.log(role.title);
                console.log(role.id);
                return {
                    name: role.title,
                    value: role.id
                };
            }),
        }
    ])
        .then(async (ans) => {
            //mysql do something
            console.log(ans.employees);
            console.log(ans.roles);
        })
        .catch((err) => console.log(err));
}



function init() {
    console.log("\nWelcome to the Employee Tracker System.\n");
    promptUser();
}

init();