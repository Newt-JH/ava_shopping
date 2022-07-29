var express = require('express');
const db = require('./../shopping_DB/serProDB');
var router = express.Router();
const wrap = require('./wrapper');
const wrapper = wrap.wrapper;

const multer = require('multer');
const fs = require('fs');
const path = require('path');

try {
    fs.readdirSync('uploads'); // 폴더 확인
} catch (err) {
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

        let f = await db.readProduct()
        res.send(f[1]);

}));

// 선택한 상품 읽어오기
router.get('/:id', wrapper(async function (req, res) {
    params = req.params.id;

        let f = await db.readOneProduct(params);
        console.log(f);
        res.send(f);

}))

// 검색 상품 읽어오기
router.get('/serch/:id', wrapper(async function (req, res) {
    params = req.params.id;

    if (params.length === 0) {
        res.send("검색어 미입력");
    } else {

            let f = await db.serchProduct(params);
            res.send(f[1]);

    }
}))

// 베스트 상품
router.get('/best/product', wrapper(async function (req, res) {

        const f = await db.readBest();
        res.send(f[1]);

}))

// 카테고리 상품 읽어오기
router.get('/cate/:id', wrapper(async function (req, res) {
    params = req.params.id;
    if (params.length === 0) {

    } else {
            let f = await db.serchCate(params)
            res.send(f);
    }
}))

// 게임 상품 읽어오기
router.get('/game/:id', wrapper(async function (req, res) {
    params = req.params.id;
    if (params.length === 0) {

    } else {
            let f = await db.serchGame(params)
            res.send(f);
    }
}))

// 게임 카테고리 상품 읽어오기
router.get('/category/id=:id&game=:game', wrapper(async function (req, res) {
    gameparams = req.params.game;
    idparams = req.params.id;

        let f = await db.gameCategory(gameparams, idparams);
        console.log(f);
        res.send(f);

}));



// 상품 등록
router.post('/reg', upload.single('proDetailImg'), function (req, res) {

    const rb = req.body;

    const pro = {
        cateIndex: rb.cateIndex,
        cateIndextwo: rb.cateIndextwo,
        cateIndexthree: rb.cateIndexthree,
        proName: rb.proName,
        proProfile: req.file.path.slice(12),
        proContents: rb.proContents,
        proDetailImg: req.file.path.slice(12),
        proPrice: rb.proPrice,
        proCount: rb.proCount,
        gameIndex: rb.gameIndex
    }

        db.newProduct(pro);
        res.send("글 등록 성공");

});

// 상품 수정
router.put('/update/:id', function (req, res) {
    rb = req.body;
    params = req.params.id;
    const pro = {
        proPrice: rb.proPrice,
        proCount: rb.proCount,
    }

        db.updateProduct(params, pro)
        return res.send("상품 정보 수정 성공");


});

// 상품 삭제
router.delete('/delete/:id', function (req, res) {
    params = req.params.id;

        db.deleteProduct(params);
        return res.send("상품 삭제");

});

module.exports = router;