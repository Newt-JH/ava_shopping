const con = require('./DatabaseConn');
const connection = con.dataCon;
const mailer = require('../mail/main');


// 주문 시 주문 가능한지 파악 및 주문 생성 / 재고 차감
function newOrderCountDown(ord,res){
    const query = `select proCount 
    from product where proIndex = ${ord.proIndex};`
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

// 주문 생성
function newOrder(ord) {
    console.log(ord);
    const query = 
    `start transaction;
    insert into \`order\`(userIndex,proIndex,orderCount,orderDate,orderPrice,orderState)
        value(${ord.userIndex},${ord.proIndex},${ord.orderCount},"${ord.orderDate}",${ord.orderPrice},0);
    update product set proCount = procount - ${ord.orderCount} where proIndex = ${ord.proIndex};
    select orderIndex from \`order\` where userIndex = ${ord.userIndex} order by orderIndex desc limit 1;
    commit;`

    connection.query(query,
        (err,rows) => {
            if (err) {
                throw err;
            }
            // 메일 발송
            orderMail(ord.userIndex,rows[3][0].orderIndex);
            return console.log("order insert success");
        }
    )
}

// 주문건 전체 읽기
function readOrder(res) {
    const query = `select \`order\`.proIndex as pi,orderCount,orderDate,orderPrice,proName,proProfile,orderState,userID,userName,orderIndex from \`order\` JOIN user JOIN product ON \`order\`.userIndex = user.userIndex and \`order\`.proIndex = product.proIndex`
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

// 거래 완료
function succOrder(params,res){
    const query = `update \`order\` set orderState = 1 where orderIndex = ${params};`
    connection.query(query,
        (err) => {
            if(err) {
                throw err;
            }
            return readOrder(res);
        })
}

// 주문 시 유저의 이메일을 읽어와서 메일 보내주기
function orderMail(userIndex,orderIndex){
    const query = `select userEmail from \`user\` where userIndex = "${userIndex}";`
    connection.query(query,
        (err,row) => {
            if(err) {
                throw err;
            }
            let emailParam = {
                toEmail: row[0].userEmail,     // 수신할 이메일
            
                subject: `Newt Mall 주문 완료 메일입니다.`,   // 메일 제목
                                                        // 메일 내용
                text: `
                안녕하세요!
                주문 완료되어 메일 발송해드립니다.
                주문하신 상품의 주문 번호는 ${orderIndex}입니다.
                `                
              };
            
              mailer.sendGmail(emailParam);

        })
}
module.exports = {
    newOrder,
    readOrder,
    readOrderOne,
    deleteOrder,
    newOrderCountDown,
    succOrder
}