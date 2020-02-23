const mysql = require('mysql')

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "xxxxxxx",
    database: "Emp_DB"
});

connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

module.exports.connection = connection;
