const mysql = require('mysql');
const mysql1 = require('mysql2/promise');

const dataCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tiger',
    port: 3306,
    database: 'ava_shopping',
    multipleStatements:true
});

const pool = mysql1.createPool({
    host: 'localhost',
    user: 'root',
    password: 'tiger' ,
    database: 'ava_shopping'
})

module.exports = {
    dataCon,
    pool
}