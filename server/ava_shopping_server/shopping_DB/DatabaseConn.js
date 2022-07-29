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


// DB 커넥션 후 Promise 반환
function pro(query) {
    return new Promise((res, rej) => {
        dataCon.query(query, function (err, rows) {
            if (err) {
                rej("Error");
            } else {
                res(rows);
            }
        })
    })
}

module.exports = {
    dataCon,
    pool,
    pro
}