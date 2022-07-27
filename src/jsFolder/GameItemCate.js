import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams,useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import '../cssFolder/GameItem.css';



function GameItemCate(props) {

    const navigate = useNavigate();

    //   MUI
    const theme = useTheme();
    //

    const [data, setData] = useState([
        {
        }
    ]);

    const { id } = useParams();
    const { game } = useParams();
    // 페이지 진입 시 글 읽어오기
    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:3000/gameitem/id=${id}&game=${game}`);
        setData(response.data);
    };
    useEffect(() => {
        sendRequest();
    }, [id, game]);


    // 금액 3자리마다 , 찍어주기
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // 글 클릭 시 이동 핸들러
    const navProfile = (e, num) => {
       navigate("../product/" + num);
    }


    if ((data.length) === 0) {
        return (
            <>
                <h1>등록된 상품이 없습니다.</h1>
            </>
        )
    } else if (data[0].proIndex === undefined) {

    } else {
        return (
            <div className='imglist'>
                <ImageList sx={{ width: 1000, height: 650 }}>
                    <ImageListItem key="Subheader" cols={2}>
                        <ListSubheader component="div"></ListSubheader>
                    </ImageListItem>
                    {data.map((datas) => (

                            <ImageListItem onClick={(e) => navProfile(e, datas.proIndex)}>
                                <img
                                    src={`${datas.proProfile}?w=248&fit=crop&auto=format`}
                                    srcSet={`${datas.proProfile}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={datas.proName}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    title={datas.proName}

                                    subtitle={datas.proCount !== 0 ?
                                        numberWithCommas(String(datas.proPrice)) + "원 / " + numberWithCommas(String(datas.proCount)) + "개"
                                        : "품절"}
                                    actionIcon={
                                        <IconButton
                                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                            aria-label={`info about ${datas.proName}`}
                                        >
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>


                        // <Card sx={{ display: 'flex', width: '500px', height: '200px', margin: "0 auto", justifyContent: "space-between", alignItems: 'center', marginBottom: "0px", marginTop: "20px" }}>
                        //     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        //         <CardContent sx={{ flex: '1 0 auto' }}>
                        //             <Typography sx={{ fontWeight: 900 }} component="div" variant="h5">
                        //                 {datas.proName}
                        //             </Typography>
                        //             <Typography variant="subtitle1" color="text.secondary" component="div">
                        //             {numberWithCommas(String(datas.proPrice))} 원
                        //             </Typography>
                        //             <Typography variant="subtitle2" color="text.secondary" component="div">
                        //                 {datas.proCount !== 0 ?
                        //                 numberWithCommas(String(datas.proCount)) + "개"
                        //                 :
                        //                 "품절"
                        //                 }


                        //             </Typography>
                        //             <br></br>
                        //         </CardContent>
                        //         <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>

                        //         </Box>
                        //     </Box>
                        //     <Link to={"../product/" + datas.proIndex}><CardMedia
                        //         component="img"
                        //         sx={{ width: 180 }}
                        //         image={datas.proProfile}
                        //         alt="No pic"
                        //     /></Link>

                        // </Card>

                    ))}
                </ImageList>

            </div>
        );
    }


}

export default GameItemCate;