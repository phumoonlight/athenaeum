const mysql = require('mysql')
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
})

con.connect(function(err) {
  if (err) throw err
  console.log('Connected!')
})

con.query({ sql: 'CREATE DATABASE IF NOT EXISTS experimental' })
con.query({ sql: 'USE experimental' })
con.query({ sql: `CREATE TABLE IF NOT EXISTS persons (
  person_id int,
  firstname varchar(255),
  lastname varchar(255),
  address varchar(255),
  city varchar(255)
)` })
// con.query({
//   sql: 'SELECT * from persons',
// }, (error, results, fields) => {
//   if (error) throw error
//   console.log({ error, results, fields })
// })
con.query({
  sql: 'SELECT * from persons',
}, (error, results, fields) => {
  if (error) throw error
  console.log({ error, results, fields })
})

// con.query('SELECT * from users', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });

con.end(() => console.log('connection end'))