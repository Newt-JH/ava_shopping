const con = require('./DatabaseConn');
const connection = con.dataCon;
const mailer = require('../mail/main');

// JWT 구현
const jwt = require('jsonwebtoken');
const secret = 'hwan'
let adminpan = false;
// 로그인
function newLogin(userID, userPassword, res) {

    const query = `select userPassword,userIndex from user where userID = "${userID}";`
    connection.query(query,
        function (err, rows) {
            if (err) { throw err }
            else if (rows[0] === undefined) {
                res.send("아이디 또는 패스워드를 확인 후 로그인 해주세요.")
            }
            else if (rows[0].userPassword === userPassword) {
                console.log(adminpan);

                // 어드민 계정 찾아오기
                readAdmin(userID);
                const userIndex = rows[0].userIndex;
                // 위에 함수가 실행되는데 시간이 소요되어 setTimeoutd으로 시간 텀 준 후 반환 함수 실행
                setTimeout(() => admin(adminpan, res, userIndex), 50);

                token = jwt.sign({
                    type: 'JWT',
                    userIndex: rows[0].userIndex
                }, secret, {
                    expiresIn: '15m', // 만료시간 15분
                    issuer: userID,
                });

            } else {
                return res.send("아이디 또는 패스워드를 확인 후 로그인 해주세요.")
            }
        })
}

// Admin 판별
function readAdmin(userID) {
    const query = `select * from admin where userID = "${userID}"`
    connection.query(query,
        (err, row) => {
            if (err) { throw err }
            if (row[0] !== undefined) {
                adminpan = true;
                return adminpan;
            } else {
                adminpan = false;
                return adminpan;
            }
        })
}

// 위에서 쓸 함수 / true라면 어드민 토큰 반환되도록 me > admin / false라면 유저 토큰 반환되도록 me > ok 반환
function admin(adminpan, res, userIndex) {
    if (adminpan === true) {

        return res.json(
            {
                me: "admin",
                token: token,
                userIndex: userIndex
            }
        )
    }
    else {
        return res.json(
            {
                me: "OK",
                token: token,
                userIndex: userIndex
            }
        )
    }
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
function newUser(user, res) {
    const query = `insert into user(userID,userPassword,userName,userEmail) value("${user.userID}","${user.userPassword}","${user.userName}","${user.userEmail}");`
    connection.query(query,
        (err) => {
            if (err) { throw err; }

            // 신규회원 가입 시 메일 발송

            let emailParam = {
                toEmail: `${user.userEmail}`,     // 수신할 이메일
                subject: `Newt Mall 회원 가입을 축하합니다.`,   // 메일 제목
                text: `
                안녕하세요!
                ${user.userName} 고객님, 
                회원 가입을 축하 드립니다.`                // 메일 내용
            };

            mailer.sendGmail(emailParam);


            return res.json("OK");
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
    const query = `select \`order\`.proIndex as pi,orderIndex,orderCount,orderDate,orderPrice,proName,proProfile,orderState from \`order\`,user,product where \`order\`.userIndex = user.userIndex and \`order\`.proIndex = product.proIndex and \`order\`.userIndex = ${params};`
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
function nickCheck(params, userName, res) {
    const query = `select * from user where userName = "${userName}"`;
    connection.query(query,
        (err, row) => {
            if (err) {
                throw err;
            } if (row[0] === undefined) {
                updateUserNick(params, userName);
                res.json("OK")
            } else {
                res.json("NO")
            }


        })
}

// 유저 패스워드 수정
function updateUserPassword(params, userPassword, res) {
    const query = `update user set userPassword = "${userPassword}" where userIndex = ${params}`;
    connection.query(query,
        (err) => {
            if (err) {
                throw err;
            }
            return res.json("유저 패스워드 수정 완료");
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