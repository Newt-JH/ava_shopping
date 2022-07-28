const con = require('./DatabaseConn');
const connection = con.pool;


// 찜 목록 조회 후 추가 or 삭제
function product() {
    const query = `select * from product`
    return connection.query(query);
}

module.exports = {
    product
}