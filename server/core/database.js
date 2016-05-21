var mysql = require('mysql'),
    connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '123',
      database : 'babytrack',
      multipleStatements: true
    });

module.exports = connection;
