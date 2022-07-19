const con = require('./DatabaseConn');
const connection = con.dataCon;


// 찜 목록 조회 후 추가 or 삭제
function wish(user,pro,res) {
    const query = `select * from wish where userIndex = ${user} and proIndex = ${pro}`
    connection.query(query,
        (err, rows) => {
            if (err) {
                throw err;
            }else if(rows[0] === undefined){
                newWish(user,pro,res)
            }else{
                delWish(user,pro,res)
            }
        })
}


// 찜 목록 추가
function newWish(user,pro,res) {
    const query = `insert into wish(userIndex,proIndex) value(${user},${pro})`
    connection.query(query,
        (err) => {
            if (err) throw err;
            console.log("찜 추가 완료");
            return res.json("찜 목록에 추가되었습니다.")
        }
    )
}

// 찜 목록 삭제
function delWish(user,pro,res) {
    const query = `delete from wish where userIndex = ${user} and proIndex = ${pro}`
    connection.query(query,
        (err) => {
            if (err) throw err;
            console.log("찜 삭제 완료");
            return res.json("찜 목록에서 삭제되었습니다.")
        }
    )
}

// 유저 찜 목록
function userWish(user,res){
    const query = `select * from wish,product where wish.proIndex = product.proIndex and userIndex = ${user};`
    connection.query(query,
        (err,rows) => {
            if (err) {throw err;}
            else if(rows[0] === undefined){
                return res.json(rows);
            }else{
                return res.json(rows);
            }
            
        })
}

module.exports = {
    wish,
    userWish
}