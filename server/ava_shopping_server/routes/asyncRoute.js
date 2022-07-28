var express = require('express');
const db = require('./../shopping_DB/asyncDB.js');
var router = express.Router();

// 유저 찜목록 조회
router.get('/', async function (req, res) {
    let f = await db.product();
    console.log("ss");
    res.send(f[0]);
});

module.exports = router;