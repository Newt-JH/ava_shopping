const con = require('./DatabaseConn');
const connection = con.dataCon;
const mailer = require('../mail/main');
// pro > DB 읽어올때 쓰는 모듈 ( 프로미스 반환 / async await 사용하기 위해 사용 )
// tto > row에 대해 읽어올 필요가 없는 쿼리 날릴때 사용
const pro = con.pro;
const tto = con.tto;

// JWT 구현
const jwt = require('jsonwebtoken');
const secret = 'hwan'
// 로그인
function newLogin(userID, userPassword, res) {

    const query = `select userPassword,userIndex from user where userID = "${userID}";`
    connection.query(query,
        async function (err, rows) {
            if (err) { throw err }
            else if (rows[0] === undefined) {
                res.send("아이디 또는 패스워드를 확인 후 로그인 해주세요.")
            }
            else if (rows[0].userPassword === userPassword) {

                const userIndex = rows[0].userIndex;

                try {
                    let f = await readAdmin(userID);

                    token = jwt.sign({
                        type: 'JWT',
                        userIndex: rows[0].userIndex
                    }, secret, {
                        expiresIn: '15m', // 만료시간 15분
                        issuer: userID,
                    });

                    admin(f, res, userIndex);
                } catch (err) {
                    res.send(err);
                }
            } else {
                return res.send("아이디 또는 패스워드를 확인 후 로그인 해주세요.")
            }
        })
}

// Admin 판별
function readAdmin(userID) {
    const query = `select * from admin where userID = "${userID}"`

    return new Promise((res, rej) => {

        connection.query(query,
            (err, row) => {
                if (err) { rej(err) }
                if (row[0] !== undefined) {
                    adminpan = true;
                    res(true);
                } else {
                    adminpan = false;
                    res(false);
                }
            })

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
function readUserIndex(userID) {
    const query = `select * from user where userID = "${userID}"`
    return pro(query);
}

// 회원 가입
function newUser(user) {
    const query = `insert into user(userID,userPassword,userName,userEmail) value("${user.userID}","${user.userPassword}","${user.userName}","${user.userEmail}");`

    tto(query);

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

}

// 유저 아이디 중복 체크
function idCheck(id) {
    const query = `select * from user where userID = "${id}"`;
    return pro(query);
}

// 전체 회원 조회
function readAllUser() {
    const query = `select * from user`
    return pro(query);
}

// 회원 상세 보기
function readOneUser(params) {
    const query = `select * from user where userIndex = ${params}`
    return pro(query);
}

// 마이 페이지
function readMypage(params, res) {
    const query = `select \`order\`.proIndex as pi,orderIndex,orderCount,orderDate,orderPrice,proName,proProfile,orderState from \`order\`,user,product where \`order\`.userIndex = user.userIndex and \`order\`.proIndex = product.proIndex and \`order\`.userIndex = ${params};`
    return pro(query);
}


// 유저 닉네임 수정
function updateUserNick(params, userName) {
    const query = `update user set userName = "${userName}" where userIndex = ${params}`;
    tto(query);
}

// 유저 닉네임 중복 체크
function nickCheck(params, userName) {
    const query = `select * from user where userName = "${userName}"`;
        return pro(query);
}

// 유저 패스워드 수정
function updateUserPassword(params, userPassword, res) {
    const query = `update user set userPassword = "${userPassword}" where userIndex = ${params}`;
    tto(query);
}

// 유저 삭제
function deleteUser(params) {
    const query = `delete from user where userIndex = ${params};`
    tto(query);
    return readAllUser();
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