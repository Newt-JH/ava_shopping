var express = require('express');
const db = require('./../shopping_DB/serWishDB');
var router = express.Router();
const wrap = require('./wrapper');
const wrapper = wrap.wrapper;


// 찜 목록 조회
router.get('/user=:user&pro=:pro', wrapper(async function (req, res) {
    userparams = req.params.user;
    proparams = req.params.pro;

        let f = await db.wish(userparams, proparams, res);

        if (f[0] === undefined) {
            db.newWish(userparams, proparams);
            res.send("찜 목록에 추가되었습니다.")
        } else {
            db.delWish(userparams, proparams);
            res.send("찜 목록에서 삭제되었습니다.")
        }

}));

// 유저 찜목록 조회
router.get('/select/:id', wrapper(async function (req, res) {
    user = req.params.id;

        let f = await db.userWish(user, res);
        res.send(f);

}));

module.exports = router;