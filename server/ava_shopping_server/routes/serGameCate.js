var express = require('express');
const db = require('./../shopping_DB/serProDB');
var router = express.Router();
const wrap = require('./wrapper');
const wrapper = wrap.wrapper;

// 게임 카테고리 상품 읽어오기
router.get('/id=:id&game=:game', wrapper(async function (req, res) {
    gameparams = req.params.game;
    idparams = req.params.id;

        let f = await db.gameCategory(gameparams, idparams)
        res.send(f);

}))


module.exports = router;