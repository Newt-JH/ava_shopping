import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie'
import '../cssFolder/Order.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import jwt_decode from "jwt-decode";
import Helmet from 'react-helmet';
import { loadTossPayments } from '@tosspayments/payment-sdk'






function Order(props) {

    const cookies = new Cookies();

    const navigate = useNavigate();

    const [data, setData] = useState([
        {
        }
    ]);

    const detailData = {
        cateIndex: data[0].cateIndex,
        proName: data[0].proName,
        proProfile: data[0].proProfile,
        proContents: data[0].proContents,
        proDetailImg: data[0].proDetailImg,
        proPrice: data[0].proPrice,
        proCount: data[0].proCount
    }

    //const [userIndex, setUserIndex] = useState('');
    const [orderCount, setOrderCount] = useState(0);

    // JWT 토큰 가져와서 디코딩
    const jwttoken = cookies.get("loginCookie");
    var decToken = jwt_decode(jwttoken);

    // 유저 인덱스 가져오기
    const index = decToken.userIndex;

    const orderCountHandler = (e) => {
        setOrderCount(e.target.value);
    }

    const { id } = useParams();

    // 페이지 진입 시 글 읽어오기
    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:3000/product/${id}`);
        setData(response.data);
    };
    useEffect(() => {
        sendRequest();
    }, []);

    function leftCount(e) {
        if (orderCount == 0) {
            setOrderCount(0);
        } else {
            setOrderCount(Number(orderCount) - 1)
        }
    }

    function rightCount(e) {
        setOrderCount(Number(orderCount) + 1)
    }

    // 주문하기 클릭 시
    const submitHandler = (event) => {
        event.preventDefault();

        // 토스 결제 모듈 실행 / 상품 이름, 상품 가격 전달
        tossMo(detailData.proName, orderCount * detailData.proPrice);

    }

    // 토스 걸제창 여는 함수
    async function tossMo(proName, orderPrice) {

        const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq'
        const tossPayments = await loadTossPayments(clientKey);

        tossPayments.requestPayment('토스페이', {
            // 결제 수단 파라미터
            // 결제 정보 파라미터
            amount: orderPrice,
            orderId: 'orderid',
            orderName: proName,
            customerName: '박토스',
            userIndex: index,
            successUrl: `http://localhost:8080/tosssuccess/prodID=${id}&userIndex=${index}&orderCount=${orderCount}`,
            failUrl: 'http://localhost:8080/tossfail',
        })
    }

    return (

        <div>

            <div className='jebal'>
                <div className='leftRight'>
                    <img className='proimg' src={detailData.proDetailImg} width="80%"></img>
                </div>
                <div className='Right'>
                    <div className='orderData'>
                        <h1>{detailData.proName}</h1>
                        <h2>{detailData.proPrice} 원</h2>
                        <h3>{detailData.proCount} 개 남아있습니다.</h3>
                        <form className='frmNewAcc' onSubmit={submitHandler}>
                            <div className='soobutton'>
                                구매 수량
                                <ArrowLeftIcon sx={{ fontSize: 30 }} onClick={leftCount} />
                                <input className='orIn' type="number" value={orderCount} min="1" max={detailData.proCount} onChange={orderCountHandler} ></input>
                                <ArrowRightIcon sx={{ fontSize: 30 }} onClick={rightCount} />
                            </div>
                            <br /><br />
                            구매 가격
                            <input type="text" className='orIn2' value={orderCount * detailData.proPrice} onChange={orderCountHandler} readonly="true"></input>
                            <div className='buy'>
                                <Stack spacing={2} direction="row">
                                    <Button type='submit' variant="outlined" >Buy</Button>
                                </Stack>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}




export default Order;