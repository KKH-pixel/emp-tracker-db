DROP DATABASE IF EXISTS employeesDB;
CREATE database employeesDB;

USE employeesDB;

CREATE TABLE departments (
    id INT PRIMARY KEY,
    dept VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,  
    dept_id INT NOT NULL, 
    FOREIGN KEY (dept_id) REFERENCES departments(id)
);

CREATE TABLE employees (
    id INT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);


-- SELECT * FROM employees;
-- select * FROM roles;
-- select * FROM departments;
-- SELECT * FROM employees, roles, departments WHERE employees.role_id=roles.id AND roles.dept_id=departments.id

-- SELECT minion.first_name AS minion_first_name,
-- minion.last_name AS minion_last_name,
-- manager.first_name AS manager_first_name,
-- manager.last_name AS manager_last_name
-- FROM employees AS minion
-- JOIN employees AS manager ON minion.manager_id=manager.id