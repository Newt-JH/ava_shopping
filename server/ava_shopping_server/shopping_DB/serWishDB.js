const con = require('./DatabaseConn');
const connection = con.dataCon;
// pro > DB 읽어올때 쓰는 모듈 ( 프로미스 반환 / async await 사용하기 위해 사용 )
// tto > row에 대해 읽어올 필요가 없는 쿼리 날릴때 사용
const pro = con.pro;
const tto = con.tto;


// 찜 목록 조회 후 추가 or 삭제
function wish(user,proin) {
    const query = `select * from wish where userIndex = ${user} and proIndex = ${proin}`;
    return pro(query);
}


// 찜 목록 추가
function newWish(user,pro) {
    const query = `insert into wish(userIndex,proIndex) value(${user},${pro})`
    tto(query);
}

// 찜 목록 삭제
function delWish(user,pro) {
    const query = `delete from wish where userIndex = ${user} and proIndex = ${pro}`
    tto(query);
}

// 유저 찜 목록
function userWish(user){
    const query = `select * from wish,product where wish.proIndex = product.proIndex and userIndex = ${user};`
    return pro(query);
}

module.exports = {
    wish,
    userWish,
    newWish,
    delWish
}