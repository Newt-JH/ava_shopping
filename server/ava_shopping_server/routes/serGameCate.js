var express = require('express');
const db = require('./../shopping_DB/serProDB');
var router = express.Router();

// 게임 카테고리 상품 읽어오기
router.get('/id=:id&game=:game', function (req, res) {
    gameparams = req.params.game;
    idparams = req.params.id;

        db.gameCategory(gameparams,idparams, res)

})


module.exports = router;