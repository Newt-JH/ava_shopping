const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tiger',
    port: 3306,
    database: 'ava_shopping'
});

// 주문 생성
function newOrder(ord) {
    const query = `insert into \`order\`(userIndex,proIndex,orderCount,orderDate,orderPrice,orderState) value(${ord.userIndex},${ord.proIndex},${ord.orderCount},"${ord.orderDate}",${ord.orderPrice},${ord.orderState});`
    connection.query(query,
        (err) => {
            if (err) {
                throw err;
            }
            return console.log("order insert success");
        }
    )
}

// 재고 줄이기
function countDown(proIndex,orderCount){
    const query = `update product set proCount = procount - ${orderCount} where proIndex = ${proIndex};`
    connection.query(query,
        (err) => {
            if (err) {
                throw err;
            }
            return console.log("값 줄이기 완료");
        }
    )
}

// 주문건 전체 읽기
function readOrder(res) {
    const query = `select * from \`order\``
    connection.query(query,
        (err,rows) => {
            if(err) {
                throw err;
            }
            return res.json(rows);
        })
}

// 주문건 하나 읽기
function readOrderOne(params,res) {
    const query = `select * from \`order\` where orderIndex = ${params}`
    connection.query(query,
        (err,rows) => {
            if(err) {
                throw err;
            }
            console.log("Select One Success");
            return res.json(rows);
        })
}

// 주문 수정 X ( 추후 개수만 수정 가능하게 만들 수도 있음 )

// 주문 삭제
function deleteOrder(params,res){
    const query = `delete from \`order\` where orderIndex = ${params};`
    connection.query(query,
        (err,rows) => {
            if(err) {
                throw err;
            }
            console.log("Delete Success")
            return readOrder(res);
        })
}
module.exports = {
    newOrder,
    readOrder,
    readOrderOne,
    deleteOrder,
    countDown
}