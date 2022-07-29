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
router.post('/login/index', async function (req, res) {
    rb = req.body;
    userID = rb.userID;

    try {
        let f = await db.readUserIndex(userID);
        res.send(f);
    } catch (err) {
        res.send(err);
    }

});

// 전체 회원 읽어오기
router.get('/', async function (req, res) {

    try {
        let f = await db.readAllUser();
        res.send(f);
    } catch (err) {
        res.send(err);
    }

});

// 선택한 회원 읽어오기
router.get('/:id', async function (req, res) {
    params = req.params.id;

    try {
        let f = await db.readOneUser(params);
        res.send(f);
    } catch (err) {
        res.send(err);
    }

});

// 마이페이지 구매 정보 읽어오기
router.get('/mypage/:id', async function (req, res) {
    params = req.params.id;

    try {
        let f = await db.readMypage(params, res);
        res.send(f);
    } catch (err) {
        res.send(err);
    }

});

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

    try {
        db.newUser(user);
        res.send("회원가입 완료");
    } catch (err) {
        res.send(err);
    }

});

// Join ID 중복 체크
router.post('/join/idcheck', async function (req, res) {
    rb = req.body;
    id = rb.userID;

    try {
        let f = await db.idCheck(id);
        if (f[0] === undefined) {
            return res.json("OK");
        } else {
            return res.json("NO");
        }
    } catch (err) {
        res.send(err);
    }

});

// 유저 닉네임 수정
router.put('/update/name/:id', async function (req, res) {
    rb = req.body;
    params = req.params.id;
    userName = rb.userName;

    try {
        let f = await db.nickCheck(userName);
        if (f[0] === undefined) {
            db.updateUserNick(params, userName);
            res.send("OK")
        } else {
            res.send("NO")
        }
    } catch (err) {
        res.send(err);
    }

});

// 유저 패스워드 수정
router.put('/update/password/:id', function (req, res) {
    rb = req.body;
    params = req.params.id;
    password = rb.userPassword;
    // sha512로 알고리즘 사용, Id+password값 변환, base64로 인코딩
    userPass = crypto.createHash("sha512").update(rb.userID + password).digest("base64")

    try {
        db.updateUserPassword(params, userPass);
        res.send("패스워드 변경 완료");
    } catch (err) {
        res.send(err);
    }

});

// 유저  삭제
router.delete('/delete/:id', async function (req, res) {
    params = req.params.id;

    try {
        let f = await db.deleteUser(params);
        res.send(f);
    } catch (err) {
        res.send(err);
    }

});


module.exports = router;