import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CateBest from './Component/CateBest';
import '../cssFolder/Search.css'

function Search(props) {

    //   MUI
    const theme = useTheme();
    //

    const [data, setData] = useState([
        {
        }
    ]);

    // 금액 3자리마다 , 찍어주기
    function numberWithCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

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
            <div className='wrap'>
                <a>검색 결과가 없습니다.</a>
                <a>이런 상품은 어떠신가요?</a>
                <a>카테고리별 Best 상품입니다.</a>
                </div>
                <CateBest />
            </>
        )
    } else if (data[0].proIndex === undefined) {

    } else {
        return (
            <div>
                {data.map((datas) => (
                     <Card sx={{ display: 'flex', width: '500px',height: '200px', margin: "0 auto" ,justifyContent: "space-between",alignItems: 'center' ,marginBottom: "0px",marginTop: "20px"}}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography sx={{fontWeight:900}} className='proName' component="div" variant="h5">
                                    {datas.proName}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    {datas.proPrice} 원
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
                        <Link to={"../product/"+datas.proIndex}><CardMedia
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
}

export default Search;