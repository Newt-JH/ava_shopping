const con = require('./DatabaseConn');
const connection = con.dataCon;


// 상품 등록
function newProduct(pro,res) {
    const query = `insert into product(cateIndex, proName, proProfile, proContents, proDetailImg, proPrice, proCount,gameIndex) value ("${pro.cateIndex}","${pro.proName}","${pro.proProfile}","${pro.proContents}","${pro.proDetailImg}",${pro.proPrice},${pro.proCount},${pro.gameIndex});`
    connection.query(query,
        (err) => {
            if (err) throw err;
            return res.json("글 등록 성공");
        }
    )
}

// 상품 전체 읽기
async function readProduct(res) {
    const query = `select * from product`
    const hwnn = await connection.query(query,
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
function readBest(res) {
    const query = `SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
    select max(oc),pi,cateIndex,proProfile from
    (select
        sum(orderCount) as oc,o.proIndex as pi,cateIndex,proProfile from
                 \`order\` o left join product p
                    on o.proIndex = p.proIndex
    group by o.proIndex) as sumtable
             group by cateIndex`

    connection.query(query,
        (err,row) => {
            if(err) {throw err;}
            return res.json(row[1]);
        })
}

// 상품 검색
function serchProduct(params,res) {
    const query = `select * 
    from 
        product join category
    on product.cateIndex = category.cateIndex
    join gamename
    on    product.gameIndex = gamename.gameIndex
    where proName like "%${params}%"
        or category.cateName like "%${params}%"
        or  gamename.gametitle like "%${params}%"

`
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
    const query = `select * from product where cateIndex = ${params}`
    connection.query(query,
        (err,rows) => {
            if(err) {
                throw err;
            }
            console.log("Select One Success");
            return res.json(rows);
        })
}


// 게임 검색
function serchGame(params,res) {
    const query = `select * from product where gameIndex = ${params}`
    connection.query(query,
        (err,rows) => {
            if(err) {
                throw err;
            }
            console.log("Select One Success");
            return res.json(rows);
        })
}


// 게임 카테고리 검색
function gameCategory(game,id,res) {
    if(game === "0" || game > 5){
        if(id === "10"){
            query = `select * from product where cateIndex > "${id}"`
        }else{
            query = `select * from product where cateIndex = "${id}" or cateIndex ="1${id}"`
        }

    }else{
        if(id === "10"){
            query = `select * from product where cateIndex > "${id}" and gameIndex = "${game}"`
        }else{
            query = `select * from product where (cateIndex = "${id}" or cateIndex ="1${id}") and gameIndex = "${game}"`
        }
    }
    connection.query(query,
        (err,rows) => {
            if(err) {
                throw err;
            }
            return res.json(rows);
        })
}

// 상품 수정
function updateProduct(params,pro,res){
    const query = `update product set proPrice=${pro.proPrice},proCount = ${pro.proCount} where proIndex = ${params}`;
    connection.query(query,
        (err) => {
            if(err) {
                throw err;
            }
            return res.json("상품 정보 수정 성공");
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
    readBest,
    gameCategory,
    serchGame
}