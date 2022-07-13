import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';

import './Order.css';

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
        <div className='mainpage'>

            <div className='jebal'>
            <div className='leftRight'>
                <img className='proimg' src={detailData.proDetailImg} width= "400px"></img>
            </div>
            <div className='Right'>
                <div className='orderData'>
        
                <h1>{detailData.proName}</h1>
                <a>{detailData.proContents}</a>
                <h2>{detailData.proPrice} 원</h2>
                <h3>{detailData.proCount} 개 남아있습니다.</h3>
                <div className='buy'>
                <Link to={"../order/"+id}><button>구매하러 가기</button></Link>
                </div>
        
                    
                </div>
        
            </div>
            </div>
    

            
            </div>

        );
    }




export default ProDetail;