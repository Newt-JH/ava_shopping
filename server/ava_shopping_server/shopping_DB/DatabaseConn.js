const mysql = require('mysql');

const dataCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tiger',
    port: 3306,
    database: 'ava_shopping',
    multipleStatements:true
});

module.exports = {
    dataCon
}