var express = require('express');
const db = require('./../shopping_DB/serOrderDB');
var router = express.Router();
const moment = require("moment");
const wrap = require('./wrapper');
const wrapper = wrap.wrapper;

// 전체 주문 건 읽어오기
router.get('/', wrapper(async function (req, res) {

    let f = await db.readOrder();
    res.send(f);

}))

// 선택한 주문 건 읽어오기
router.get('/:id', wrapper(async function (req, res) {
  params = req.params.id;

    let f = await db.readOrderOne(params);
    res.send(f);

}));

// 주문 건 생성
router.post('/reg/:id', wrapper(async function (req, res) {
  rb = req.body;
  const today = moment();

  const ord = {
    userIndex: rb.userIndex,
    proIndex: req.params.id,
    orderCount: rb.orderCount,
    orderDate: today.format("YY-MM-DD"),
    orderPrice: rb.orderPrice,
    orderState: 0,
  }

    let f = await db.newOrderCountDown(ord);
    console.log(f);

    if (f[0].proCount >= ord.orderCount) {
      db.newOrder(ord);
      res.send("주문에 성공하였습니다.");
    } else {
      res.json("재고 부족으로 인하여 주문에 실패하였습니다.");
    }


}));

// 주문 완료
router.put('/admin/orderClear/:id', wrapper(async function (req, res) {
  const orderIndex = req.params.id;

    let f = await db.succOrder(orderIndex);
    res.send(f);

}));

// 주문건 삭제
router.delete('/delete/:id', function (req, res) {
  params = req.params.id;

    db.deleteOrder(params);
    res.send("주문 삭제");

});

module.exports = router;