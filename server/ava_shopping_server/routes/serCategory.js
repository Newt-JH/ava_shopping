var express = require('express');
const db = require('./../shopping_DB/serCateDB');
var router = express.Router();

// 전체 카테고리 읽어오기
router.get('/', function(req, res) {
  db.readCate(res);
});

// 선택한 카테고리 읽어오기
router.get('/:id',function(req,res){
    params = req.params.id;
    db.readCateOne(params,res)
})

// 카테고리 등록
router.post('/reg',function(req,res) {
    rb = req.body;
    cateName = rb.cateName;
    db.newCate(cateName);
    res.json("글 등록 성공");
})

// 카테고리 수정
router.put('/update/:id',function(req,res) {
    rb = req.body;
    params = req.params.id;
    if(rb.cateName.length === 0){
        res.json("cateName 비어있음");
    }else{
        cateName = rb.cateName;
        db.updateCate(params,cateName)
        res.json("글 수정 성공");
    }
})

// 카테고리 삭제
router.delete('/delete/:id',function(req,res) {
    params = req.params.id;
    db.deleteCate(params,res);
})

module.exports = router;