var express = require('express');
const db = require('./../shopping_DB/serOrderDB');
var router = express.Router();
const moment = require("moment");
const { now } = require('moment');

// 전체 주문 건 읽어오기
router.get('/', function(req, res) {
  db.readOrder(res);
});

// 선택한 주문 건 읽어오기
router.get('/:id',function(req,res){
    params = req.params.id;
    db.readOrderOne(params,res)
})

// 주문 건 생성
router.post('/reg/:id',function(req,res) {
    rb = req.body;
    const today = moment();

    const ord = {
      userIndex: rb.userIndex,
      proIndex: req.params.id,
      orderCount: rb.orderCount,
      orderDate: today.format("YY-MM-DD"),
      orderPrice: rb.orderPrice,
      orderState: 0
    }

db.newOrder(ord)
db.countDown(ord.proIndex,ord.orderCount)
    res.json("글 등록 성공");
})

// 주문건 수정 ( 미제작 예정 )

// 주문건 삭제

router.delete('/delete/:id',function(req,res) {
    params = req.params.id;
    db.deleteOrder(params,res);
})

module.exports = router;