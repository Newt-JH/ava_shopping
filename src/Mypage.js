import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CateBest from './CateBest';
import 'moment/locale/ko';
import './Search.css'
import { Cookies } from 'react-cookie'

function Mypage(props) {

    const cookies = new Cookies();

    //   MUI
    const theme = useTheme();
    //

    const [data, setData] = useState([
        {
        }
    ]);

    // 유저 인덱스 쿠키에서 가져오기
    const index = cookies.get("userIndex");

    // 현재 페이지 인덱스값 가져오기
    const { id } = useParams();

    // 현재 내가 있는 페이지와 유저 인덱스가 다르다면 다른 유저의 페이지 진입이므로 막아주기
    const navigate = useNavigate();
    if (index !== id) {
        navigate(`/`);
    }

    // 페이지 진입 시 글 읽어오기
    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:3000/user/mypage/${id}`);
        setData(response.data);
    };


    useEffect(() => {
        sendRequest();
    }, []);



    if ((data.length) === 0) {
        return (
            <>
                <div className='wrap'>
                    <a>검색 결과가 없습니다.</a>
                    <a>이런 상품은 어떠신가요?</a>
                    <a>카테고리별 Best 상품입니다.</a>
                </div>
                <CateBest />
            </>
        )
    }
    else return (
        <div>
            {data.map((datas) => (
                <Card sx={{ display: 'flex', width: '500px', height: '200px', margin: "0 auto", justifyContent: "space-between", alignItems: 'center', marginBottom: "0px", marginTop: "20px" }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography sx={{ fontWeight: 900 }} className='proName' component="div" variant="h5">
                                {datas.proName}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary" component="div">
                                총 구매 금액 : {datas.orderPrice} 원
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary" component="div">
                                총 구매 수량 : {datas.orderCount}개
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary" component="div">
                                주문날짜 : {datas.orderDate}
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                        </Box>
                    </Box>
                    <Link to={"../product/" + datas.pi}><CardMedia
                        component="img"
                        sx={{ width: 180 }}
                        image={datas.proProfile}
                        alt="No pic"
                    /></Link>

                </Card>

            ))}

        </div>
    );
}




export default Mypage;