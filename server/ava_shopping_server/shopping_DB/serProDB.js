const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tiger',
    port: 3306,
    database: 'ava_shopping'
});


// 상품 등록
function newProduct(pro) {
    const query = `insert into product(cateIndex, proName, proProfile, proContents, proDetailImg, proPrice, proCount) value (${pro.cateIndex},"${pro.proName}","${pro.proProfile}","${pro.proContents}","${pro.proDetailImg}",${pro.proPrice},${pro.proCount});`
    connection.query(query,
        (err) => {
            if (err) throw err;
            return console.log("Product insert success");
        }
    )
}

// 상품 전체 읽기
function readProduct(res) {
    const query = `select * from product where proCount > 0`
    connection.query(query,
        (err,rows) => {
            if(err) {
                throw err;
            }
            return res.json(rows);
        })
}

// 상품 상세 보기
function readOneProduct(params,res) {
    const query = `select * from product where proIndex = ${params}`
    connection.query(query,
        (err,rows) => {
            if(err) {
                throw err;
            }
            console.log("Select One Success");
            return res.json(rows);
        })
}


// 카테고리 Best 상품
function readBest(params,res) {
    const query = `select sum(orderCount) as oc,\`order\`.proIndex as pi,cateIndex,proProfile
    from \`order\`,product
    where \`order\`.proIndex = product.proIndex and cateIndex = ${params}
    group by \`order\`.proIndex
    order by oc desc
    limit 1;`

    connection.query(query,
        (err,row) => {
            if(err) {throw err;}
            return res.json(row);
        })
}

// 상품 검색
function serchProduct(params,res) {
    const query = `select * from product where proName like "%${params}%" and proCount > 0
    UNION DISTINCT
    select proIndex,product.cateIndex,proName,proProfile,proContents,proDetailImg,proPrice,proCount from product,category where product.cateIndex = category.cateIndex
    and category.cateName = "${params}"`
    connection.query(query,
        (err,rows) => {
            if(err) {
                throw err;
            }
            console.log("Select One Success");
            return res.json(rows);
        })
}

// 카테고리 검색
function serchCate(params,res) {
    const query = `select * from product where cateIndex = ${params} and proCount > 0`
    connection.query(query,
        (err,rows) => {
            if(err) {
                throw err;
            }
            console.log("Select One Success");
            return res.json(rows);
        })
}

// 상품 수정
function updateProduct(params,pro){
    const query = `update product set cateIndex = "${pro.cateIndex}",proName ="${pro.proName}",proProfile="${pro.proProfile}",proContents="${pro.proContents}",proDetailImg="${pro.proDetailImg}",proPrice=${pro.proPrice},proCount = ${pro.proCount} where proIndex = ${params}`;
    connection.query(query,
        (err) => {
            if(err) {
                throw err;
            }
            console.log("Update Success")
        })
}

// 상품 삭제
function deleteProduct(params,res){
    const query = `delete from product where proIndex = ${params};`
    connection.query(query,
        (err) => {
            if(err) {
                throw err;
            }
            console.log("Delete Success")
            return readProduct(res);
        })
}
module.exports = {
    newProduct,
    readProduct,
    readOneProduct,
    updateProduct,
    deleteProduct,
    serchProduct,
    serchCate,
    readBest
}