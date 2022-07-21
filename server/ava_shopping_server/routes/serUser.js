var express = require('express');
const db = require('./../shopping_DB/serUserDB');
var router = express.Router();
const crypto = require('crypto');

// 로그인
router.post('/login', function (req, res) {
    rb = req.body;
    userID = rb.userID;
    userPassword = rb.userPassword;
    // 암호화된 비밀번호
    // sha512로 알고리즘 사용, Id+password값 변환, base64로 인코딩
    password = crypto.createHash("sha512").update(userID + userPassword).digest("base64")
    // 가져온 비밀번호
    db.newLogin(userID, password, res);
})

// 로그인 시 유저 인덱스 읽어오기
router.post('/login/index', function (req, res) {
    rb = req.body;
    userID = rb.userID;
    db.readUserIndex(userID, res)
})

// 전체 회원 읽어오기
router.get('/', function (req, res) {
    db.readAllUser(res);
});

// 선택한 회원 읽어오기
router.get('/:id', function (req, res) {
    params = req.params.id;
    db.readOneUser(params, res)
})

// 마이페이지 구매 정보 읽어오기
router.get('/mypage/:id', function (req, res) {
    params = req.params.id;
    db.readMypage(params, res)
})

// 회원 등록
router.post('/reg', function (req, res) {
    rb = req.body;
    password = rb.userPassword;
    // sha512로 알고리즘 사용, Id+password값 변환, base64로 인코딩
    userPass = crypto.createHash("sha512").update(rb.userID + password).digest("base64")
    userNick = new Date().getTime().toString(36);
    const user = {
        userID: rb.userID,
        userPassword: userPass,
        userName: userNick,
        userEmail: rb.userEmail
    }
    db.newUser(user,res);
})

// Join ID 중복 체크
router.post('/join/idcheck', function (req, res) {
    rb = req.body;
    id = rb.userID;
    db.idCheck(id, res);
})

// 유저 닉네임 수정
router.put('/update/name/:id', function (req, res) {
    rb = req.body;
    params = req.params.id;
    userName = rb.userName;
    db.nickCheck(params, userName,res);
})

// 유저 패스워드 수정
router.put('/update/password/:id', function (req, res) {
    rb = req.body;
    params = req.params.id;
    password = rb.userPassword;
     // sha512로 알고리즘 사용, Id+password값 변환, base64로 인코딩
     userPass = crypto.createHash("sha512").update(rb.userID + password).digest("base64")
    db.updateUserPassword(params,userPass,res);
})

// 유저  삭제
router.delete('/delete/:id', function (req, res) {
    params = req.params.id;
    db.deleteUser(params, res);
})


module.exports = router;