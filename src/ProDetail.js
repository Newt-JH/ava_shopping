import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';

function ProDetail(props) {

    const [data, setData] = useState([
        {
        }
    ]);

    const { id } = useParams();

    // 페이지 진입 시 글 읽어오기
    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:3000/product/${id}`);
        console.log(response.data);
        setData(response.data);
        console.log(data);
    };
    useEffect(() => {
        sendRequest();
    }, []);



    const detailData = {
        cateIndex: data[0].cateIndex,
        proName: data[0].proName,
        proProfile: data[0].proProfile,
        proContents: data[0].proContents,
        proDetailImg: data[0].proDetailImg,
        proPrice: data[0].proPrice,
        proCount: data[0].proCount
    }

        return (
            <div className='di'>
                <div className='ho'>
                </div>
                <br></br>            <br></br>
                <table border="1">
                    <tr>
                        <th><h4>상품이름</h4></th>
                        <th><h4>상품 대표 이미지</h4></th>
                        <th><h4>상품 설명</h4></th>
                        <th><h4>상품 상세 이미지</h4></th>
                        <th><h4>가격</h4></th>
                        <th><h4>개수</h4></th>
                        <th><h4>구매</h4></th>
                        <th></th>
                    </tr>
                    <td>{detailData.proName}</td>
                    <td><img src={'../shopping_img/'+ detailData.proProfile}></img></td>
                    <td>{detailData.proContents}</td>
                    <td><img src={detailData.proDetailImg.slice(12)}></img></td>
                    <td>{detailData.proPrice}</td>
                    <td>{detailData.proCount}</td>
                    <td><Link to={"../order/"+id}><button>구매 버튼</button></Link></td>
                </table>
                <br></br>        <br></br>
            </div>
        );
    }




export default ProDetail;