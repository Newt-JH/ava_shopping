const con = require('./DatabaseConn');
const connection = con.dataCon;


// 카테고리 등록
function newCate(categoryName,res) {
    const query = `insert into category(cateName) value("${categoryName}");`
    connection.query(query,
        (err) => {
            if (err) throw err;
            return res.json("글 등록 성공");
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
function updateCate(params,cateName,res){
    const query = `update category set cateName = "${cateName}" where cateIndex = ${params}`;
    connection.query(query,
        (err) => {
            if(err) {
                throw err;
            }
            console.log("Update Success")
            res.json("글 수정 성공");
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