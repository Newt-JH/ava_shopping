const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tiger',
    port: 3306,
    database: 'ava_shopping'
});

// JWT 구현
const jwt = require('jsonwebtoken');
const secret = 'hwan'

// 로그인
function newLogin(userID, userPassword, res) {

    const query = `select userPassword,userIndex from user where userID = "${userID}";`
    connection.query(query,
        (err, rows) => {
            if (err) { throw err }
            else if(rows[0] === undefined){
                res.send("아이디 또는 패스워드를 확인 후 로그인 해주세요.")
            }
            else if (rows[0].userPassword === userPassword) {

                token = jwt.sign({
                    type: 'JWT',
                    userIndex: rows[0].userIndex
                }, secret, {
                    expiresIn: '15m', // 만료시간 15분
                    issuer: userID,
                });

                return res.json(
                    {
                        me: "OK",
                        token: token,
                        userIndex: rows[0].userIndex
                    }
                )
            } else {
                return res.send("아이디 또는 패스워드를 확인 후 로그인 해주세요.")
            }
        })
}

// 유저 인덱스 조회
function readUserIndex(userID, res) {
    const query = `select * from user where userID like "${userID}"`
    connection.query(query,
        (err, rows) => {
            if (err) {
                throw err;
            }
            return res.json(rows);
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

// 유저 아이디 중복 체크
function idCheck(id, res) {
    const query = `select * from user where userID like "${id}"`;
    connection.query(query,
        (err, row) => {
            if (err) { throw err }
            else if (row[0] === undefined) {
                return res.json("OK");
            } else {
                return res.json("NO");
            }
        })
}

// 전체 회원 조회
function readAllUser(res) {
    const query = `select * from user`
    connection.query(query,
        (err, rows) => {
            if (err) {
                throw err;
            }
            return res.json(rows);
        })
}

// 회원 상세 보기
function readOneUser(params, res) {
    const query = `select * from user where userIndex = ${params}`
    connection.query(query,
        (err, rows) => {
            if (err) {
                throw err;
            }
            console.log("Select One Success");
            return res.json(rows);
        })
}

// 마이 페이지
function readMypage(params, res) {
    const query = `select \`order\`.proIndex as pi,orderCount,orderDate,orderPrice,proName,proProfile from \`order\`,user,product where \`order\`.userIndex = user.userIndex and \`order\`.proIndex = product.proIndex and \`order\`.userIndex = ${params};`
    connection.query(query,
        (err, rows) => {
            if (err) {
                throw err;
            }
            console.log(rows);
            return res.json(rows);
        })
}


// 유저 닉네임 수정
function updateUserNick(params, userName) {
    const query = `update user set userName = "${userName}" where userIndex = ${params}`;
    connection.query(query,
        (err) => {
            if (err) {
                throw err;
            }
            console.log("Name Update Success")
        })
}

// 유저 닉네임 중복 체크
function nickCheck(params, userName,res) {
    const query = `select * from user where userName = "${userName}"`;
    connection.query(query,
        (err,row) => {
            if (err) {
                throw err;
            }if(row[0] === undefined){
                updateUserNick(params,userName);
                res.json("OK")
            }else{
                res.json("NO")
            }
            

        })
}

// 유저 패스워드 수정
function updateUserPassword(params, userPassword) {
    const query = `update user set userPassword = "${userPassword}" where userIndex = ${params}`;
    connection.query(query,
        (err) => {
            if (err) {
                throw err;
            }
            console.log("Password Update Success")
        })
}

// 유저 삭제
function deleteUser(params, res) {
    const query = `delete from user where userIndex = ${params};`
    connection.query(query,
        (err) => {
            if (err) {
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
    newLogin,
    idCheck,
    readUserIndex,
    readMypage,
    updateUserPassword,
    nickCheck
}