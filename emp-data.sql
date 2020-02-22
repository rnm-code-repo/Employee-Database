DROP DATABASE IF EXISTS Emp_DB;

CREATE DATABASE Emp_DB;

USE Emp_DB;


CREATE TABLE Department (
 id INT NOT NULL AUTO_INCREMENT,
 dep_name VARCHAR(45) NOT NULL,
 PRIMARY KEY (id)
 );

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
role_title VARCHAR(30) NOT NULL,
role_salary DECIMAL(30) NOT NULL,
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
INSERT INTO Department (dep_name)
VALUES ("Legal"),("Engineering"),("Finance");

select role_title, dep_name from role, department where role.department_id = department.id;

INSERT INTO role(role_title,role_salary,department_id)
VALUES ("lawyer",100,2),("Software Engineer",200,3),("Lead Engineer",300,3),("Sales Executive",400,1);

update role set department_id = 3 where department_id = 1 and role_title = 'Sales Executive';


INSERT INTO Employee (First_name,Last_name,role_id,manager_id)
VALUES ("John","Doe",4,1),("Azim","Premji",3,1),("Narayan","Murthy",1,1);


select * from role;

SELECT e.id ,e.First_name,e.Last_name ,r.role_title,r.role_salary,d.dep_name
from department d, role r, employee e
where d.id = r.department_id
  and r.id = e.role_id;