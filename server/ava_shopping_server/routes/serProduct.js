var express = require('express');
const db = require('./../shopping_DB/serProDB');
var router = express.Router();

const multer = require('multer');
const fs = require('fs');
const path = require('path');
 
const wrapper = asyncFn => {
    return (async (req, res, next) => {
      try {
        return await asyncFn(req, res, next);
      } catch (error) {
        return next(error);
      }
    });
  };


try {
	fs.readdirSync('uploads'); // 폴더 확인
} catch(err) {
	console.error('uploads 폴더가 없습니다. 폴더를 생성합니다.');
    fs.mkdirSync('uploads'); // 폴더 생성
}
 
const upload = multer({
    storage: multer.diskStorage({ // 저장한공간 정보 : 하드디스크에 저장
        destination(req, file, done) { // 저장 위치
            done(null, '../../public'); // uploads라는 폴더 안에 저장
        },
        filename(req, file, done) { // 파일명을 어떤 이름으로 올릴지
            const ext = path.extname(file.originalname); // 파일의 확장자
            done(null, path.basename(file.originalname, ext) + Date.now() + ext); // 파일이름 + 날짜 + 확장자 이름으로 저장
        }
    }),
    limits: { fileSize: 1000 * 1024 * 1024 } // 5메가로 용량 제한
});

// 전체 상품 읽어오기
router.get('/', wrapper(async function (req, res) {
    db.readProduct(res);
}));

// 선택한 상품 읽어오기
router.get('/:id', function (req, res) {
    params = req.params.id;
    db.readOneProduct(params, res)
})

// 검색 상품 읽어오기
router.get('/serch/:id', function (req, res) {
    params = req.params.id;
    if(params.length === 0){

    }else{
        db.serchProduct(params, res)
    }

})

// 베스트 상품
router.get('/best/product',function(req,res) {
    db.readBest(res)
})

// 카테고리 상품 읽어오기
router.get('/cate/:id', function (req, res) {
    params = req.params.id;
    if(params.length === 0){

    }else{
        db.serchCate(params, res)
    }
})

// 게임 상품 읽어오기
router.get('/game/:id', function (req, res) {
    params = req.params.id;
    if(params.length === 0){

    }else{
        db.serchGame(params, res)
    }
})

// 게임 카테고리 상품 읽어오기
router.get('/category/id=:id&game=:game', function (req, res) {
    gameparams = req.params.game;
    idparams = req.params.id;
    if(params.length === 0){

    }else{
        db.gameCategory(gameparams,idparams, res)
    }
})

// 상품 등록
router.post('/reg',upload.single('proDetailImg'),function(req, res, next) {

    const rb = req.body;
    console.log(req.file,req.body);
    console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ")
    console.log(req.file);
    console.log("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ")
    console.log(req.body);

    const pro = {
        cateIndex: rb.cateIndex,
        proName: rb.proName,
        proProfile: req.file.path.slice(12),
        proContents: rb.proContents,
        proDetailImg: req.file.path.slice(12),
        proPrice: rb.proPrice,
        proCount: rb.proCount,
        gameIndex:rb.gameIndex
    }

    db.newProduct(pro,res);
})

// 상품 수정
router.put('/update/:id', function (req, res) {
    rb = req.body;
    params = req.params.id;
    const pro = {
        proPrice: rb.proPrice,
        proCount: rb.proCount,
    }
    db.updateProduct(params,pro,res)
})

// 상품 삭제
router.delete('/delete/:id', function (req, res) {
    params = req.params.id;
    db.deleteProduct(params,res);
})

module.exports = router;