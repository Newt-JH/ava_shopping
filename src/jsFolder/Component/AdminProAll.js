import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import '../../cssFolder/AdminProAll.css';


function AdminProAll(props) {

    const navigate = useNavigate();
    const cookies = new Cookies();

    const adminCookie = cookies.get("adminCookie");

    function notAdmin(){
        if(adminCookie === undefined){
            alert("비정상적인 접근입니다.")
            navigate("/");
        }
    }

    const [data, setData] = useState([
        {
        }
    ]);
    const [delId, setDelId] = useState('');

    const { id } = useParams();

    // 페이지 진입 시 글 읽어오기
    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:3000/product`);
        setData(response.data);
    };
    useEffect(() => {
        sendRequest();
        notAdmin();
    }, []);

    // 글 삭제
    const deleteRequest = async (num) => {
        if (window.confirm("삭제 하시겠습니까?")) {
            await axios.delete(`http://localhost:3000/product/delete/${num}`);
            alert(num + " 번 글 삭제 완료");
            sendRequest();
        } else {
        }

    }

    // 글 삭제 클릭 핸들러
    const delHandler = (e, num) => {
        deleteRequest(num);
    }

    // 금액 3자리마다 , 찍어주기
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
            <div className='haaw'>
                <h2>전체 아이템 관리 페이지 / 수정 삭제 가능</h2>
                {data.map((datas) => (
                    <Card sx={{ display: 'flex', width: '500px', height: '200px', margin: "0 auto", justifyContent: "space-between", alignItems: 'center', marginBottom: "0px", marginTop: "20px" }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography sx={{ fontWeight: 900 }} component="div" variant="h5">
                                    {datas.proIndex + ". " + datas.proName}
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
                                <Typography border="1px solid" width="30px" borderRadius="10px" variant="subtitle1" color="text.secondary" component="div">
                                    <Link to={"/admin/productedit/" + datas.proIndex}>수정</Link>
                                </Typography>
                                <Typography border="1px solid" width="30px" borderRadius="10px" onClick={(e) => delHandler(e, datas.proIndex)} variant="subtitle1" color="text.secondary" component="div">
                                    삭제
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


}

export default AdminProAll;