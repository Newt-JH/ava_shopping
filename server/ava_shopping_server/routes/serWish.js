var express = require('express');
const db = require('./../shopping_DB/serWishDB');
var router = express.Router();


// 찜 목록 조회
router.get('/user=:user&pro=:pro', function (req, res) {
    userparams = req.params.user;
    proparams = req.params.pro;
    db.wish(userparams,proparams,res)
});

// 유저 찜목록 조회
router.get('/select/:id', function (req, res) {
    user = req.params.id;
    db.userWish(user,res)
});

module.exports = router;