# Employee-Database
##### A NodeJS MYSQL based application to manage employee data
- - -

This is an interactive application that provides following functionality to manage employee and related data

- Manage Departments 
- Manage Roles 
- Manage Employees
- - -
### Process Details
Interactive CLI provides user option to perform various tasks.
Based on user input app sends detais to a controller and from their to bd layer to perform operaiton on data.
```
                          Controllers      db-service  _____ 
                       <-|-> Department|-> Department |MYSQL|
CLI input --> app.js -><-|-> Role      |-> Role       | DB  |
                 to UI <-|-> Employee  |-> Employee   |_____|
```
- - -
### Development Details
#### This application users NodeJS packages
- inquirer - To get user input (commandline prompts) 
- mysql - To handle data and db connectivity 
  
- - -
    