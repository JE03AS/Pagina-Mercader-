// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'catalog'
});

connection.connect(error => {
  if (error) throw error;
  console.log('Database connected!');
});

module.exports = connection;
