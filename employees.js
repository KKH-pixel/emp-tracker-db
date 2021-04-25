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
            'Add employee Department',
            'Add employee Role',
            'View all employees',
            'View all employees by Department',
            'View all employees by Role',
            'Update employee',
            'Update employee Department',
            'Update employee Role',
            'Exit',

            // 'Remove employees',
            // 'Remove employee Role',
            // 'Remove employee Role',
            // 'View all employees by Manager',
            // 'Update Employee Manager',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all employees':
          employeeSearch();
          break;

        // case 'View all employees by Department':
        //   deptSearch();
        //   break;

        // case 'View all employees by Role':
        //   roleSearch();
        //   break;

        // case 'View all employees by Manager':
        //   managerSearch();
        //   break;

        // default:
        //   console.log(`Invalid action: ${answer.action}`);
        //   break;

        case 'Exit':
            console.log(`Exiting the program.`); 
            process.exit();
      }
    });
};

const employeeSearch = () => {
  inquirer
    .prompt({
      name: 'employee',
      type: 'input',
      message: 'What employee would you like to search for?',
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

// const deptSearch = () => {
//   const query =
//     'SELECT department FROM departments GROUP BY artist HAVING count(*) > 1';
//   connection.query(query, (err, res) => {
//     res.forEach(({ artist }) => console.log(artist));
//     runSearch();
//   });
// };

// const roleSearch = () => {
//   inquirer
//     .prompt([
//       {
//         name: 'start',
//         type: 'input',
//         message: 'Enter starting position: ',
//         validate(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         },
//       },
//       {
//         name: 'end',
//         type: 'input',
//         message: 'Enter ending position: ',
//         validate(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         },
//       },
//     ])
//     .then((answer) => {
//       const query =
//         'SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?';
//       connection.query(query, [answer.start, answer.end], (err, res) => {
//         res.forEach(({ position, song, artist, year }) => {
//           console.log(
//             `Position: ${position} || Song: ${song} || Artist: ${artist} || Year: ${year}`
//           );
//         });
//         runSearch();
//       });
//     });
// };

// const managerSearch = () => {
//   inquirer
//     .prompt({
//       name: 'song',
//       type: 'input',
//       message: 'What song would you like to look for?',
//     })
//     .then((answer) => {
//       console.log(answer.song);
//       connection.query(
//         'SELECT * FROM top5000 WHERE ?',
//         { song: answer.song },
//         (err, res) => {
//           if (res[0]) {
//             console.log(
//               `Position: ${res[0].position} || Song: ${res[0].song} || Artist: ${res[0].artist} || Year: ${res[0].year}`
//             );
//           } else {
//             console.error(`No results for ${answer.song}`);
//           }
//           runSearch();
//         }
//       );
//     });
// };