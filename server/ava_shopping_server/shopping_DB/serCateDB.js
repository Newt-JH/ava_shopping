const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tiger',
    port: 3306,
    database: 'ava_shopping'
});


// 카테고리 등록
function newCate(categoryName) {
    const query = `insert into category(cateName) value("${categoryName}");`
    connection.query(query,
        (err) => {
            if (err) throw err;
            return console.log("category insert success");
        }
    )
}

// 카테고리 전체 읽기
function readCate(res) {
    const query = `select * from category`
    connection.query(query,
        (err,rows) => {
            if(err) {
                throw err;
            }
            return res.json(rows);
        })
}

// 카테고리 하나 읽기
function readCateOne(params,res) {
    const query = `select * from category where cateIndex = ${params}`
    connection.query(query,
        (err,rows) => {
            if(err) {
                throw err;
            }
            console.log("Select One Success");
            return res.json(rows);
        })
}

// 카테고리 수정
function updateCate(params,cateName){
    const query = `update category set cateName = "${cateName}" where cateIndex = ${params}`;
    connection.query(query,
        (err) => {
            if(err) {
                throw err;
            }
            console.log("Update Success")
        })
}

// 카테고리 삭제
function deleteCate(params,res){
    const query = `delete from category where cateIndex = ${params};`
    connection.query(query,
        (err) => {
            if(err) {
                throw err;
            }
            console.log("Delete Success")
            return readCate(res);
        })
}
module.exports = {
    newCate,
    readCate,
    readCateOne,
    updateCate,
    deleteCate
}