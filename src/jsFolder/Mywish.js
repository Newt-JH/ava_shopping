import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CateBest1 from '../cssFolder/CateBest.css';
import CateBest from './Component/CateBest';
import { Cookies } from 'react-cookie'
import jwt_decode from "jwt-decode";

function Mywish(props) {

    //   MUI
    const theme = useTheme();
    //

    const [data, setData] = useState([
        {
        }
    ]);

    const cookies = new Cookies();

    // JWT 토큰 가져와서 디코딩
    const jwttoken = cookies.get("loginCookie");
    var decToken = jwt_decode(jwttoken);

    // 유저 인덱스 가져오기
    const index = decToken.userIndex;

    // 현재 페이지 인덱스값 가져오기
    const { id } = useParams();
    // 현재 내가 있는 페이지와 유저 인덱스가 다르다면 다른 유저의 페이지 진입이므로 막아주기
    const navigate = useNavigate();
    if (String(index) !== id || index === undefined) {
        navigate(`/`);
    }

    // 페이지 진입 시 글 읽어오기
    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:3000/wish/select/${id}`);
        setData(response.data);
    };
    useEffect(() => {
        sendRequest();
    }, [id]);


    // 금액 3자리마다 , 찍어주기
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    if ((data.length) === 0) {
        return (
            <>
                <div className='wrap'>
                    <a>찜하신 상품이 없습니다.</a>
                    <a>이런 상품은 어떠신가요?</a>
                    <a>카테고리별 Best 상품입니다.</a>
                </div>
                <CateBest />
            </>
        )
    } else return (
            <div className='orderList'>
                <h1>찜 목록</h1>
                {data.map((datas) => (
                    <Card sx={{ display: 'flex', width: '500px', height: '200px', margin: "0 auto", justifyContent: "space-between", alignItems: 'center', marginBottom: "0px", marginTop: "20px" }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography sx={{ fontWeight: 900 }} component="div" variant="h5">
                                    {datas.proName}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {numberWithCommas(String(datas.proPrice))} 원
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary" component="div">
                                {datas.proCount !== 0 ?
                                    numberWithCommas(String(datas.proCount)) + "개"
                                    :
                                    "품절"
                                }
                                </Typography>
                                <br></br>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                            </Box>
                        </Box>
                        <Link to={"../product/" + datas.proIndex}><CardMedia
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

export default Mywish;