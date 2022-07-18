import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie'
import './Order.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import jwt_decode from "jwt-decode";

const cookies = new Cookies();


function Order(props) {

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
        console.log(index);

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

    const submitHandler = (event) => {
        event.preventDefault();
        axios({
            url: `http://localhost:3000/order/reg/${id}`, // api 호출 주소
            method: 'post',
            data: {
                userIndex: index,
                orderCount: orderCount,
                orderPrice: orderCount * detailData.proPrice
            }
        }).then(function orderCheck(res) {
            // 주문 성공 시
            console.log(res.data);
            navigate("/");
            alert(`${detailData.proName} 물건 구매 완료했습니다.`)
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