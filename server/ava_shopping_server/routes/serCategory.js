var express = require('express');
const db = require('./../shopping_DB/serCateDB');
var router = express.Router();

// 전체 카테고리 읽어오기
router.get('/', async function(req, res) {
    try{
        let f = await db.readCate();
        res.send(f);
    }catch(err){
        res.send(err);
    }
});

// 선택한 카테고리 읽어오기
router.get('/:id',async function(req,res){
    params = req.params.id;
    try{
        let f = await db.readCateOne(params);
        res.send(f);
    }catch(err){
        res.send(err);
    }
})

// 카테고리 등록
router.post('/reg',function(req,res) {
    rb = req.body;
    cateName = rb.cateName;
    try{
        db.newCate(cateName);
        res.send("카테고리 등록 완료");
    }catch(err){
        res.send(err);
    }

})

// 카테고리 수정
router.put('/update/:id',function(req,res) {
    rb = req.body;
    params = req.params.id;
    cateName = rb.cateName;
    if(cateName.length === 0){
        res.send("cateName 입력 후 전송해주세요.");
    }else{
        try{
            db.updateCate(params,cateName);
            res.send("수정 완료");
        }catch(err){
            res.send(err);
        }

    }
})

// 카테고리 삭제
router.delete('/delete/:id',function(req,res) {
    params = req.params.id;
    try{
        db.deleteCate(params);
        res.send("삭제 완료");
    }catch(err){
        res.send(err);
    }

})

module.exports = router;