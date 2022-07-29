const con = require('./DatabaseConn');
const connection = con.dataCon;
const pro = con.pro;
const tto = con.tto;

// 상품 등록
function newProduct(pro) {
    const query = `start transaction;
    insert into product(cateIndex, proName, proProfile, proContents, proDetailImg, proPrice, proCount,gameIndex) value ("${pro.cateIndex}","${pro.proName}","${pro.proProfile}","${pro.proContents}","${pro.proDetailImg}",${pro.proPrice},${pro.proCount},${pro.gameIndex});
    select proIndex from product order by proIndex desc limit 1;
    commit ;`
    connection.query(query,
        (err, row) => {
            if (err) throw err;
            else {
                const cate = {
                    cateIndex: pro.cateIndex,
                    cateIndex2: pro.cateIndextwo,
                    cateIndex3: pro.cateIndexthree,
                }
                newCate(row[2][0].proIndex, cate)
            }
        }
    )
}

// 카테고리 등록
function newCate(proIndex, cate) {
    console.log(proIndex);
    console.log(cate);

    var query = ``;
    if (cate.cateIndex2 === 'none' && cate.cateIndex3 === 'none') {
        // 둘 다 비어있다면 
        // 1번만 날림
        query = `insert into cateAll(proIndex,cateIndex) value (${proIndex},${cate.cateIndex});`
    } else if (cate.cateIndex2 === 'none') {
        // 2번만 비어있으면
        // 1번 3번 날림
        query = `insert into cateAll(proIndex,cateIndex) value (${proIndex},${cate.cateIndex}),(${proIndex},${cate.cateIndex3});`
    } else if (cate.cateIndex3 === 'none') {
        // 3번만 비어있으면
        // 1번 2번 날림
        query = `insert into cateAll(proIndex,cateIndex) value (${proIndex},${cate.cateIndex}),(${proIndex},${cate.cateIndex2});`
    } else {
        // 다 날림
        query = `insert into cateAll(proIndex,cateIndex) value (${proIndex},${cate.cateIndex}),(${proIndex},${cate.cateIndex2}),(${proIndex},${cate.cateIndex3});`
    }

    tto(query);

}

// 상품 전체 읽기
function readProduct() {
    const query = `SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
    select proName,cA.cateIndex,proPrice,proCount,product.proIndex,proProfile from
                 product join cateAll cA on product.proIndex = cA.proIndex
    group by proName
    order by cA.proIndex;`

    return pro(query);

}


// 상품 상세 보기
function readOneProduct(params) {
    const query = `select * from product where proIndex = ${params}`
    return pro(query);
}


// 카테고리 Best 상품
function readBest() {
    const query = `SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
    select *
    from (select jj.*, cA.cateIndex
          from (Select product.proindex, proname, sum(orderCount) as sc, proprofile
                from product
                         left join \`order\` o
                                   on product.proIndex = o.proIndex
                where orderCount > 0
                group by proname) as jj
                   join cateAll cA on jj.proIndex = cA.proIndex
    order by sc desc
    limit 10000
    ) src
    group by src.cateIndex;`

    return pro(query);
}

// 상품 검색
function serchProduct(params, result) {
    const query = `SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
    select * from
    product join cateAll cA
        on product.proIndex = cA.proIndex
           join category c on cA.cateIndex = c.cateIndex
           join gamename g on product.gameIndex = g.gameIndex

where proName like "%${params}%" or cateName like "%${params}%" or gametitle like "%${params}%"
group by proName
order by product.proIndex;
`

    return pro(query);
}

// 카테고리 검색
function serchCate(params) {
    const query = `select proName,cA.cateIndex,proPrice,proCount,product.proIndex,proProfile from
    product join cateAll cA on product.proIndex = cA.proIndex
where cA.cateIndex = "${params}"
order by cA.proIndex;`
    
    return pro(query);
}


// 게임 검색
function serchGame(params) {
    const query = `select * from product where gameIndex = ${params}`
    return pro(query);
}


// 게임 카테고리 검색
function gameCategory(game, id) {

    // game이 0일때 id로 category 전체 상품 조회
    // else game 번호 + category 조회
    if (game === "0" || game > 3) {
        query = `select proName,cA.cateIndex,proPrice,proCount,product.proIndex,proProfile from
        product join cateAll cA on product.proIndex = cA.proIndex
        where cA.cateIndex = "${id}"
        order by cA.proIndex;`

        return pro(query);
    }

    else {
        query = `select proName,cA.cateIndex,proPrice,proCount,product.proIndex,proProfile,gameIndex from
        product join cateAll cA on product.proIndex = cA.proIndex
        where cA.cateIndex = "${id}" and gameIndex = "${game}"
        order by cA.proIndex;`

        return pro(query);
    }


}

// 상품 수정
function updateProduct(params, pro) {
    const query = `update product set proPrice=${pro.proPrice},proCount = ${pro.proCount} where proIndex = ${params}`;
    tto(query);
}

// 상품 삭제
function deleteProduct(params) {
    const query = `start transaction;
    delete from product where proIndex = ${params};
    delete from cateAll where proIndex = ${params};
    commit;`
    
    tto(query);
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
    serchGame,
    newCate
}