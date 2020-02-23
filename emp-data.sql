DROP DATABASE IF EXISTS Emp_DB;

CREATE DATABASE Emp_DB;

USE Emp_DB;


CREATE TABLE Department (
 id INT NOT NULL AUTO_INCREMENT,
 name VARCHAR(45) NOT NULL,
 PRIMARY KEY (id)
 );

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL(30) NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY (id),
foreign key (department_id)references Department(id)
);

CREATE TABLE Employee (
  id INT NOT NULL AUTO_INCREMENT,
  First_name VARCHAR(45) NULL,
  Last_name VARCHAR(45) NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  PRIMARY KEY (id),
  foreign Key (role_id)references role(id),
  foreign key (manager_id)references Employee(id)
);
