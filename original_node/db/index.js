const config = require('./config')
const mysql = require('mysql')

const conn = mysql.createConnection({
    host,
    user,
    password,
    database
})

conn.connect();
