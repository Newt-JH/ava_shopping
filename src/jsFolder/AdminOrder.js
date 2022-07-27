import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import '../cssFolder/AdminProAll.css';


function AdminOrder(props) {

    const navigate = useNavigate();
    const cookies = new Cookies();

    const adminCookie = cookies.get("adminCookie");

    function notAdmin() {
        if (adminCookie === undefined) {
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
        const response = await axios.get(`http://localhost:3000/order`);
        setData(response.data);
    };
    useEffect(() => {
        sendRequest();
        notAdmin();
    }, []);

    // // 거래 완료 핸들러
    // const tradeHandler = (e, num) => {
    //     tradeRequest(num);
    // }

    //     // 거래 완료 처리
    //     const tradeRequest = async (num) => {
    //         if (window.confirm("주문 완료 처리 하시겠습니까?")) {
    //             axios({
    //                 url: `http://localhost:3000/order/admin/orderClear/${num}`, // api 호출 주소
    //                 method: 'put',
    //                 data: {
    //                 }
    //             }).then(function productChange(res) {
    //                 // 정보 변경 시
    //                 console.log(res.data);
    //                 navigate("/admin/order");
    //             })
    //             alert(num + " 번 거래 완료 처리 되었습니다.");
    //             sendRequest();
    //         } else {
    //         }
    
    //     }

    // 금액 3자리마다 , 찍어주기
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    if ((data.length) === 0) {
        return (
            <>
                <h1>주문 내역이 없습니다.</h1>
            </>
        )
    } else if (data[0].pi === undefined) {

    } else {
        return (
            <div className='haaw'>
                <h2>거래 완료 전 주문</h2>
                {data.map((datas) => (
                    <div>
                        {datas.orderState === 0 ?
                            <div>
                                <Card sx={{ display: 'flex', width: '500px', height: '200px', margin: "0 auto", justifyContent: "space-between", alignItems: 'center', marginBottom: "0px", marginTop: "20px" }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography sx={{ fontWeight: 900 }} component="div" variant="h5">
                                                {datas.orderIndex}. {datas.proName}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                {numberWithCommas(String(datas.orderPrice))} 원
                                            </Typography>
                                            <Typography variant="subtitle2" color="text.secondary" component="div">
                                                {numberWithCommas(String(datas.orderCount)) + "개"}
                                            </Typography>
                                            <Typography variant="subtitle2" color="text.secondary" component="div">
                                                구매자 : {datas.userID} / 닉네임 : {datas.userName}
                                            </Typography>
                                            {/* <Typography border="1px solid" width="63px" borderRadius="10px" onClick={(e) => tradeHandler(e, datas.orderIndex)} variant="subtitle1" color="text.secondary" component="div">
                                                거래 완료
                                            </Typography>
                                            <br></br> */}
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
                            </div> : <div></div>}


                    </div>

                ))}
                <br /><br />
                <h2>거래 완료 주문</h2>
                {data.map((datas) => (
                    <div>
                        {datas.orderState === 1 ?
                            <div>
                                <Card sx={{ display: 'flex', width: '500px', height: '200px', margin: "0 auto", justifyContent: "space-between", alignItems: 'center', marginBottom: "0px", marginTop: "20px" }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography sx={{ fontWeight: 900 }} component="div" variant="h5">
                                                {datas.orderIndex}. {datas.proName}
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                {numberWithCommas(String(datas.orderPrice))} 원
                                            </Typography>
                                            <Typography variant="subtitle2" color="text.secondary" component="div">
                                                {numberWithCommas(String(datas.orderCount)) + "개"}
                                            </Typography>
                                            <Typography variant="subtitle2" color="text.secondary" component="div">
                                                구매자 : {datas.userID} / 닉네임 : {datas.userName}
                                            </Typography>
                                            <br></br>
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
                            </div> : <div></div>}


                    </div>

                ))}
            </div>
        );
    }


}

export default AdminOrder;