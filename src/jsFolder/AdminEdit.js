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

function AdminEdit() {


    const cookies = new Cookies();

    const adminCookie = cookies.get("adminCookie");

    function notAdmin(){
        if(adminCookie === undefined){
            alert("비정상적인 접근입니다.")
            navigate("/");
        }
    }


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

    const [orderCount, setOrderCount] = useState(0);
    const [orderPrice, setOrderPrice] = useState(0);

    const orderCountHandler = (e) => {
        setOrderCount(e.target.value);
    }

    const orderPriceHandler = (e) => {
        setOrderPrice(e.target.value);
    }

    const { id } = useParams();

    // 페이지 진입 시 글 읽어오기
    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:3000/product/${id}`);
        setData(response.data);
        setOrderCount(response.data[0].proCount);
        setOrderPrice(response.data[0].proPrice);
    };
    useEffect(() => {
        sendRequest();
        notAdmin();
    }, []);

    const submitHandler = (event) => {
        event.preventDefault();

        if(orderPrice === 0){
            setOrderPrice(detailData.proPrice);
        }

        axios({
            url: `http://localhost:3000/product/update/${id}`, // api 호출 주소
            method: 'put',
            data: {
                proCount: orderCount,
                proPrice: orderPrice
            }
        }).then(function productChange(res) {
            // 정보 변경 시
            console.log(res.data);
            navigate("/admin/proall");
            alert(`${res.data}`)
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
                                    변경할 수량
                                    <input className='orIn2' type="number" value={orderCount} onChange={orderCountHandler} ></input>
                                </div>
                                <br /><br />
                                변경할 가격
                                <input type="number" className='orIn2' value={orderPrice} min="100" onChange={orderPriceHandler}></input>
                                <div className='buy'>
                                    <Stack spacing={2} direction="row">
                                        <Button type='submit' variant="outlined" >변경</Button>
                                    </Stack>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    );
}




export default AdminEdit;