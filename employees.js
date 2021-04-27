const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,

  user: 'root',
  password: 'password',
  database: 'employeesDB',
});

connection.connect((err) => {
  if (err) throw err;
  runSearch();
});

const runSearch = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
            'Add employees',
            'Add new Department',
            'Add new Roles',
            'Search for an employee',
            'View all employees',
            'View all Departments',
            'View all Roles',
            'Update employee Role',
            'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'Search for an employee':
          employeeSearch();
          break;

        case 'View all employees':
          employeeView();
          break;

        case 'View all Departments':
           deptView();
           break;

        case 'View all Roles':
          rolesView();
          break;

        case 'Add employees':
          createEmployee();
          break;

        case 'Add new Roles':
          createRoles();
          break;

        case 'Add new Department':
          createDept();
          break;

        case 'Update employee Role':
          updateRoles();
          break;

        case 'Exit':
            console.log(`Exiting the program.`); 
            process.exit();
      }
    });
};

const employeeView = () => {
  const query = `SELECT 
  minion.id AS ID,
  minion.first_name AS first_name,
  minion.last_name AS last_name,
  roles.title AS title,
  roles.salary AS salary,
  departments.dept AS department,
  CASE
  WHEN manager.id IS NOT NULL THEN CONCAT (manager.first_name, ' ', manager.last_name)
  ELSE NULL
  END manager
  FROM employees AS minion
  JOIN roles ON minion.role_id=roles.id
  JOIN departments ON roles.dept_id=departments.id
  LEFT OUTER JOIN employees AS manager ON minion.manager_id=manager.id
  ORDER BY minion.id asc`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);

    runSearch();
  });
}

const deptView = () => {
  const query = `SELECT 
  departments.id AS id, 
  departments.dept AS department 
  FROM departments
  ORDER BY departments.id asc`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);

    runSearch();
  });
}

const rolesView = () => {
  const query = `SELECT 
  roles.id AS ID,
  roles.title AS title,
  roles.salary AS salary,
  departments.dept AS department
  FROM roles
  JOIN departments ON roles.dept_id=departments.id
  ORDER BY roles.id asc`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);

    runSearch();
  });
}

const employeeSearch = () => {
  inquirer
    .prompt({
      name: 'employee',
      type: 'input',
      message: 'Which employee would you like to search for?',
    })
    .then((answer) => {
      const query = `SELECT 
      minion.first_name AS minion_first_name,
      minion.last_name AS minion_last_name,
      manager.first_name AS manager_first_name,
      manager.last_name AS manager_last_name,
      roles.title AS roles_title
      FROM employees AS minion
      JOIN roles on minion.role_id=roles.id
      LEFT OUTER JOIN employees AS manager ON minion.manager_id=manager.id
      WHERE minion.first_name=?`;
      connection.query(query, [answer.employee], (err, res) => {
        if (err) throw err;
        // console.log(res)
        res.forEach(({ minion_last_name, minion_first_name, roles_title, manager_first_name, manager_last_name}) => {
          console.table(
            `Name: ${minion_first_name} ${minion_last_name} || Role: ${roles_title} || Direct Manager: ${manager_first_name} ${manager_last_name}`
          );
        });
        runSearch();
      });
    });
};

const createEmployee = () => {
  connection.query('SELECT * FROM roles', (err, res) =>{
    if (err) throw err;
    let roles_array = res.map(role => ({
      name: role.title, 
      value: role.id,
    }))
    connection.query('SELECT * FROM employees', (err, res) =>{
      if (err) throw err;
      let manager_array = res.map(manager => ({
        name: `${manager.first_name} ${manager.last_name}`, 
        value: manager.id,
      }))
      inquirer
      .prompt([
        {
          name: 'emp_first',
          type: 'input',
          message: 'First name:', 
        },
        {
          name: 'emp_last',
          type: 'input',
          message: 'Last name:', 
        },
        {
          name: 'emp_role',
          type: 'list',
          message: 'Employee title:', 
          choices: roles_array
        },    
        {
          name: 'emp_manager',
          type: 'rawlist',
          message: 'Manager name (if no manager, just hit enter):',
          default: 'null',
          choices: manager_array 
        },
    ])
      .then((answer) => {
      connection.query(
        'INSERT INTO employees SET ?',
        {
          first_name: answer.emp_first,
          last_name: answer.emp_last,
          role_id: answer.emp_role,
          manager_id: answer.emp_manager
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} Employee saved.\n`);
          runSearch();
        }
      )});
    })
  })
};


const createRoles = () => {
  connection.query('SELECT * FROM departments', (err, res) =>{ 
    if (err) throw err;
    let dept_array2 = res.map(dept => ({
      name: dept.dept, 
      value: dept.id,
    }))
    inquirer
    .prompt([
      {
        name: 'roles_title',
        type: 'input',
        message: 'Job title:', 
      },
      {
        name: 'roles_salary',
        type: 'input',
        message: 'Job salary:', 
      },
      {
        name: 'dept_id',
        type: 'list',
        message: 'Please choose the correct department:', 
        choices: dept_array2
      },    
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO roles SET ?',
        {
          title: answer.roles_title,
          salary: answer.roles_salary,
          dept_id: answer.dept_id,
        },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} New Role saved.\n`);
          runSearch();
        }
      )});
    })
  };


  const createDept = () => {
    connection.query('SELECT * FROM departments', (err, res) =>{
      if (err) throw err;
        inquirer
        .prompt([
          {
            name: 'department',
            type: 'input',
            message: 'Department name:', 
          }
      ])
        .then((answer) => {
        connection.query(
          'INSERT INTO departments SET ?',
          {
            dept: answer.department,
          },
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} Department saved.\n`);
            runSearch();
          }
        )});
      })
    };

    const updateRoles = () => {
      connection.query('SELECT * FROM employees', (err, res) =>{
        if (err) throw err;
        let employee_array = res.map(employee => ({
          name: `${employee.first_name} ${employee.last_name}`, 
          value: employee.id,
        }))
      connection.query('SELECT * FROM roles', (err, res) =>{
        if (err) throw err;
        let roles_array = res.map(role => ({
          name: role.title, 
          value: role.id,
        }))
        inquirer
        .prompt([
          {
            name: 'emp_choice',
            type: 'list',
            message: 'Please choose employee to update:', 
            choices: employee_array
          }, 
          {
            name: 'new_role',
            type: 'list',
            message: 'Please choose role to update:', 
            choices: roles_array
          }, 
      ])
      .then((answer) => {
        connection.query(
          'UPDATE employees SET ? WHERE ?',
          [
          {
            role_id: answer.new_role,
          },
          {
            id: answer.emp_choice,
          },
          ],
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} Employee saved.\n`);
            runSearch();
          }
        )});
      })
    })
  };
