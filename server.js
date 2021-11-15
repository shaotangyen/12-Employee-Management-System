const { CONNREFUSED } = require('dns');
const inquirer = require('inquirer');
const util = require('util');
const db = require("./config/connection");
const cTable = require('console.table');

// List of prompt menu questions

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
                    updateEmployeeRole();
                    break;
                case 'Quit':
                    process.exit(0);
            }
        })
        .catch((err) => console.log(err));
}

// Function to view all departments

async function viewAllDepartments() {
    try {
        let [data] = await db.query("SELECT ID, department_name AS DEPARTMENT FROM departments ORDER BY id ASC");
        console.table(data);
    } catch (err) {
        console.log(err);
    }
    promptUser();
}

// Function to view all roles

async function viewAllRoles() {
    try {
        let [data] = await db.query(
            `SELECT roles.id AS ID, roles.title AS TITLE, departments.department_name AS DEPARTMENT, roles.salary AS SALARY
        FROM roles JOIN departments
        ON roles.department_id = departments.id
        ORDER BY roles.id ASC
        `);
        console.table(data);
    } catch (err) {
        console.log(err);
    }
    promptUser();
}

// Function to view all employees

async function viewAllEmpolyees() {
    try {
        let [data] = await db.query(
            `SELECT e.id AS ID, e.first_name AS "FIRST NAME", e.last_name AS "LAST NAME", roles.title AS TITLE, departments.department_name AS DEPARTMENT, roles.salary AS SALARY, IFNULL(CONCAT(m.first_name,' ',m.last_name) , 'None') as MANAGER
        FROM employees e
        LEFT JOIN employees m ON m.id = e.manager_id
        INNER JOIN roles ON e.role_id = roles.id
        INNER JOIN departments ON roles.department_id = departments.id
        ORDER BY e.id ASC
        `
        );
        console.table(data);
    } catch (err) {
        console.log(err);
    }
    promptUser();
}

// Function to add department

async function addDepartment() {
    await inquirer
        .prompt([
            {
                type: 'input',
                name: 'department',
                message: "What's the department name?",
            }
        ])
        .then((ans) => {
            db.query(`INSERT INTO departments (department_name) VALUE ("${ans.department}")`);
            console.log(`Department ${ans.department} has been added`);
        })
        .catch((err) => console.log(err));
    promptUser();
}

// Function to add role

async function addRole() {
    let [departments] = await db.query("SELECT department_name FROM departments");
    await inquirer
        .prompt([
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
        ])
        .then(async (ans) => {
            let [[depId]] = await db.query(`SELECT id FROM departments where department_name = "${ans.department}"`);
            await db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${ans.role}", "${ans.salary}", ${depId.id})`);
            console.log(`Role ${ans.role} has been added`);
        })
        .catch((err) => console.log(err));
    promptUser();
}

// Function to add employee

async function addEmployee() {
    let [roles] = await db.query(`SELECT * FROM roles`);
    let [managers] = await db.query(`SELECT * FROM employees`);
    await inquirer
        .prompt([
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

// Function to update an employee's role

async function updateEmployeeRole() {
    let [employees] = await db.query(`SELECT * FROM employees`);
    let [roles] = await db.query(`SELECT * FROM roles`);
    await inquirer
        .prompt([
            {
                type: 'list',
                name: 'employee',
                message: "Which employee's role would you like to update?",
                choices: employees.map((emp) => {
                    return {
                        name: `${emp.first_name} ${emp.last_name}`,
                        value: emp.id
                    };
                }),
            },
            {
                type: 'list',
                name: 'role',
                message: "Which role do you want to assign to the selected employee?",
                choices: roles.map((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    };
                }),
            }
        ])
        .then(async (ans) => {
            await db.query(`UPDATE employees SET role_id = ${ans.role} WHERE id = ${ans.employee}`);
            console.log(`Role has been updated`);

        })
        .catch((err) => console.log(err));

    promptUser();
}

function init() {
    console.log("===========================================");
    console.log("\n  Welcome to the Employee Tracker System\n");
    console.log("===========================================");
    promptUser();
}

init();