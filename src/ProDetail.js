import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Cookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import './Order.css';

function ProDetail(props) {

    const cookies = new Cookies();

    const [data, setData] = useState([
        {
        }
    ]);

    const { id } = useParams();

    // 페이지 진입 시 글 읽어오기
    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:3000/product/${id}`);
        setData(response.data);
    };
    useEffect(() => {
        sendRequest();
    }, []);

    // JWT 토큰 가져와서 디코딩
    // 토큰이 없을 경우 예외 처리를 위해 index값 0으로 초기 설정
    // 토큰 있다면 index값을 유저 index로 변환 / 토큰 없다면 index는 0으로 유지

    let index = 0;
    const jwttoken = cookies.get("loginCookie");
    if(jwttoken !== undefined){
        var decToken = jwt_decode(jwttoken);
        index = decToken.userIndex;
    }else{
        index = 0;
    }

    // 찜 목록 추가 or 삭제하는 요청
    const sendWish = async () => {
        const response = await axios.get(`http://localhost:3000/wish/user=${index}&pro=${id}`);
        alert(response.data);
    };

    const wishCheck = () => {
        if (cookies.get("loginCookie") === undefined) {
            if (window.confirm("로그인 하시겠습니까?")) {
                navigate(`/login`);
            } else {
            }
        } else {
            sendWish();
        }
    };

    const navigate = useNavigate();

    const loginCheck = () => {
        if (cookies.get("loginCookie") === undefined) {
            if (window.confirm("로그인 하시겠습니까?")) {
                navigate(`/login`);
            } else {
            }
        } else {
            navigate(`../order/${id}`);
        }
    };

    // 금액 3자리마다 , 찍어주기
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const detailData = {
        cateIndex: data[0].cateIndex,
        proName: data[0].proName,
        proProfile: data[0].proProfile,
        proContents: data[0].proContents,
        proDetailImg: data[0].proDetailImg,
        proPrice: numberWithCommas(String(data[0].proPrice)),
        proCount: numberWithCommas(String(data[0].proCount))
    }

    return (
        <div className='mainpage'>

            <div className='jebal'>
                <div className='leftRight'>
                    <img className='proimg' src={detailData.proDetailImg} width="400px"></img>
                </div>
                <div className='Right'>
                    <div className='orderData'>

                        <h1>{detailData.proName}</h1>
                        <a>{detailData.proContents}</a>
                        <h2>{detailData.proPrice} 원</h2>
                        <h3>{detailData.proCount} 개 남아있습니다.</h3>
                        <div className='buy'>
                            <Stack spacing={2} direction="row">
                                <Button onClick={loginCheck} variant="outlined" >Buy</Button>
                            </Stack>

                            <Stack spacing={2} direction="row">
                                <Button onClick={wishCheck} variant="outlined" >Wish</Button>
                            </Stack>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}




export default ProDetail;