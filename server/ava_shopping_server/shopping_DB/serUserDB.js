const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tiger',
    port: 3306,
    database: 'ava_shopping'
});

// 로그인
function newLogin(userID,userPassword,res){
    const query = `select userPassword from user where userID = "${userID}";`
    connection.query(query,
        (err,rows) => {
            if(err) {throw err}
            else if(rows[0].userPassword === userPassword){
                return res.json("OK")
            }else{
                return res.json("FAIL")
            }   
        })
}

// 회원 가입
function newUser(user) {
    const query = `insert into user(userID,userPassword,userName,userEmail) value("${user.userID}","${user.userPassword}","${user.userName}","${user.userEmail}");`
    connection.query(query,
        (err) => {
            if (err) throw err;
            return console.log("User Join success");
        }
    )
}

// 전체 회원 조회
function readAllUser(res) {
    const query = `select * from user`
    connection.query(query,
        (err,rows) => {
            if(err) {
                throw err;
            }
            return res.json(rows);
        })
}

// 회원 상세 보기
function readOneUser(params,res) {
    const query = `select * from user where userIndex = ${params}`
    connection.query(query,
        (err,rows) => {
            if(err) {
                throw err;
            }
            console.log("Select One Success");
            return res.json(rows);
        })
}

// 유저 닉네임 수정
function updateUserNick(params,userName){
    const query = `update user set userName = "${userName}" where userIndex = ${params}`;
       connection.query(query,
        (err) => {
            if(err) {
                throw err;
            }
            console.log("Name Update Success")
        })
}

// 유저 삭제
function deleteUser(params,res){
    const query = `delete from user where userIndex = ${params};`
    connection.query(query,
        (err) => {
            if(err) {
                throw err;
            }
            console.log("Delete Success")
            return readAllUser(res);
        })
}
module.exports = {
    newUser,
    readAllUser,
    readOneUser,
    updateUserNick,
    deleteUser,
    newLogin
}