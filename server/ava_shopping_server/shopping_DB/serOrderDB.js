const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tiger',
    port: 3306,
    database: 'ava_shopping',
    multipleStatements: true
});

// 주문 생성
function newOrder(ord) {
    const query = `
    start transaction;
    insert into \`order\`(userIndex,proIndex,orderCount,orderDate,orderPrice,orderState) value(${ord.userIndex},${ord.proIndex},${ord.orderCount},"${ord.orderDate}",${ord.orderPrice},${ord.orderState});
    update product set proCount = procount - ${ord.orderCount} where proIndex = ${ord.proIndex};
    commit;`
    connection.query(query,
        (err) => {
            if (err) {
                throw err;
            }
            return console.log("order insert success");
        }
    )
}

// 주문 새로운 DB 짜보기
function newOrderCountDown(ord,res){
    console.log(ord);
    console.log(ord.proIndex);
    const query = `select proCount from product where proIndex = ${ord.proIndex};`
    connection.query(query,
        (err,row) => {
            if (err) {
                throw err;
            }else{
                if(row[0].proCount >= ord.orderCount){
                    // 재고가 주문량보다 많으면
                    newOrder(ord);
                    res.json("주문에 성공하였습니다.");
                }else{
                    res.json("재고 부족으로 인하여 주문에 실패하였습니다.");
                }
            }
            
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
    newOrderCountDown
}