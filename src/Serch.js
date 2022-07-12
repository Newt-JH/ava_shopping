import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';

function Search(props) {

    const [data, setData] = useState([
        {
        }
    ]);

    const { id } = useParams();
    // 페이지 진입 시 글 읽어오기
    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:3000/product/serch/${id}`);
        console.log(response.data);
        setData(response.data);
    };
    useEffect(() => {
        sendRequest();
    }, []);

    if ((data.length) === 0) {
        return (
            <>
                <h1>검색 결과가 없습니다.</h1>
            </>
        )
    } else if (data[0].proIndex === undefined) {

    } else {
        return (
            <div className='di'>
                <div className='ho'>
                </div>
                <br></br>            <br></br>

                <table border="1">
                    <tr>
                        <th><h4>상품이름</h4></th>
                        <th><h4>상품 대표 이미지</h4></th>
                        <th><h4>가격</h4></th>
                        <th><h4>개수</h4></th>
                        <th></th>
                    </tr>
                    {data.map((datas) => (
                        <tr>
                            <td>{datas.proName}</td>
                            <td><Link to={"../product/"+datas.proIndex}><img src={datas.proProfile}></img></Link></td>
                            <td>{datas.proPrice}</td>
                            <td>{datas.proCount}</td>
                        </tr>
                    ))}
                </table>
                <br></br>        <br></br>
            </div>
        );
    }


}

export default Search;