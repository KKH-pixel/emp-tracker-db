DROP DATABASE IF EXISTS employeesDB;
CREATE database employeesDB;

USE employeesDB;

CREATE TABLE employees (
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (position)
);

CREATE TABLE roles (
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  PRIMARY KEY (position)
);

CREATE TABLE departments (
  dept VARCHAR(30) NOT NULL,
  PRIMARY KEY (position)
);

SELECT * FROM employees;
select * from roles;
select * from departments;