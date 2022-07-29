const mailer = require('../mail/main');
const con = require('./DatabaseConn');
const connection = con.dataCon;
// pro > DB 읽어올때 쓰는 모듈 ( 프로미스 반환 / async await 사용하기 위해 사용 )
// tto > row에 대해 읽어올 필요가 없는 쿼리 날릴때 사용
const pro = con.pro;
const tto = con.tto;


// 주문 시 주문 가능한지 파악 및 주문 생성 / 재고 차감
function newOrderCountDown(ord) {
    const query = `select proCount from product where proIndex = ${ord.proIndex};`
    return pro(query);
}

// 주문 생성
async function newOrder(ord) {
    console.log(ord);
    const query =
        `start transaction;
    insert into \`order\`(userIndex,proIndex,orderCount,orderDate,orderPrice,orderState)
        value(${ord.userIndex},${ord.proIndex},${ord.orderCount},"${ord.orderDate}",${ord.orderPrice},0);
    update product set proCount = procount - ${ord.orderCount} where proIndex = ${ord.proIndex};
    select orderIndex from \`order\` where userIndex = ${ord.userIndex} order by orderIndex desc limit 1;
    commit;`;

    try {
        let f = await pro(query);
        orderMail(ord.userIndex, f[3][0].orderIndex);
    } catch (err) {
        console.log(err);
    }

}

// 주문건 전체 읽기
function readOrder() {
    const query = `select \`order\`.proIndex as pi,orderCount,orderDate,orderPrice,proName,proProfile,orderState,userID,userName,orderIndex from \`order\` JOIN user JOIN product ON \`order\`.userIndex = user.userIndex and \`order\`.proIndex = product.proIndex`
    return pro(query);
}

// 주문건 하나 읽기
function readOrderOne(params) {
    const query = `select * from \`order\` where orderIndex = ${params}`
    return pro(query);
}

// 주문 삭제
function deleteOrder(params) {
    const query = `delete from \`order\` where orderIndex = ${params};`
    tto(query);
}

// 거래 완료
function succOrder(params) {
    const query = `update \`order\` set orderState = 1 where orderIndex = ${params};`
    tto(query);
    // 거래 완료 처리 후 전체 글 읽기 리턴
    return readOrder();
}

// 주문 시 유저의 이메일을 읽어와서 메일 보내주기
function orderMail(userIndex, orderIndex) {
    const query = `select userEmail from \`user\` where userIndex = "${userIndex}";`
    connection.query(query,
        (err, row) => {
            if (err) {
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