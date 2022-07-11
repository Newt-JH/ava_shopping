var express = require('express');
const db = require('./../shopping_DB/serUserDB');
var router = express.Router();
const crypto = require('crypto');


// 로그인
router.post('/login',function(req,res){
    rb = req.body;
    userID = rb.userID;
    userPassword = rb.userPassword;
    // 암호화된 비밀번호
    password = crypto.createHash("sha512").update(userID + userPassword).digest("base64")
    // 가져온 비밀번호
    db.newLogin(userID,password,res);
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

// 회원 등록
router.post('/reg', function (req, res) {
    rb = req.body;
    password = rb.userPassword;
    userPass = crypto.createHash("sha512").update(rb.userID + password).digest("base64")
    userNick = new Date().getTime().toString(36);
    const user = {
        userID: rb.userID,
        userPassword: userPass,
        userName: userNick,
        userEmail: rb.userEmail
    }
    db.newUser(user);
    res.json("OK");
})

// 유저 닉네임 수정
router.put('/update/name/:id', function (req, res) {
    rb = req.body;
    params = req.params.id;
    userName = rb.userName;
    db.updateUserNick(params, userName);
    res.json("유저 닉네임 수정 완료");
})

// 유저  삭제
router.delete('/delete/:id', function (req, res) {
    params = req.params.id;
    db.deleteUser(params,res);
})

module.exports = router;