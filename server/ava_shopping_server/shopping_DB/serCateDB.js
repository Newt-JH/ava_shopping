const con = require('./DatabaseConn');
const connection = con.dataCon;
// pro > DB 읽어올때 쓰는 모듈 ( 프로미스 반환 / async await 사용하기 위해 사용 )
// tto > row에 대해 읽어올 필요가 없는 쿼리 날릴때 사용
const pro = con.pro;
const tto = con.tto;


// 카테고리 등록
function newCate(categoryName) {
    const query = `insert into category(cateName) value("${categoryName}");`
    tto(query);
}

// 카테고리 전체 읽기
function readCate() {
    const query = `select * from category`
    return pro(query);
}

// 카테고리 하나 읽기
function readCateOne(params) {
    const query = `select * from category where cateIndex = ${params}`
    return pro(query);
}

// 카테고리 수정
function updateCate(params, cateName) {
    const query = `update category set cateName = "${cateName}" where cateIndex = ${params}`;
    tto(query);
}

// 카테고리 삭제
function deleteCate(params) {
    const query = `delete from category where cateIndex = ${params};`
    tto(query);
}
module.exports = {
    newCate,
    readCate,
    readCateOne,
    updateCate,
    deleteCate
}