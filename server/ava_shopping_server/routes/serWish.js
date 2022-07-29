var express = require('express');
const db = require('./../shopping_DB/serWishDB');
var router = express.Router();


// 찜 목록 조회
router.get('/user=:user&pro=:pro', async function (req, res) {
    userparams = req.params.user;
    proparams = req.params.pro;

    try {
        let f = await db.wish(userparams, proparams, res);

        if (f[0] === undefined) {
            db.newWish(userparams, proparams);
            res.send("찜 목록에 추가되었습니다.")
        } else {
            db.delWish(userparams, proparams);
            res.send("찜 목록에서 삭제되었습니다.")
        }

    } catch (err) {
        res.send(err);
    }

});

// 유저 찜목록 조회
router.get('/select/:id', async function (req, res) {
    user = req.params.id;

    try {
        let f = await db.userWish(user, res);
        res.send(f);
    } catch (err) {
        res.send(err);
    }

});

module.exports = router;