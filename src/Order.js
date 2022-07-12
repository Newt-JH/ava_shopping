import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {Cookies} from 'react-cookie'

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
    const [orderCount, setOrderCount] = useState('');
    const [orderPrice, setOrderPirce] = useState('');

    const userIndexHandler = (e) => {
        
    }
    //setUserIndex(1);
    const userIndex = cookies.get("userIndex");

    const orderCountHandler = (e) => {
        setOrderCount(e.target.value);
        setOrderPirce((e.target.value) * detailData.proPrice);
    }

    const orderPriceHandler = (e) => {

    }

    const { id } = useParams();

    // 페이지 진입 시 글 읽어오기
    const sendRequest = async () => {
        const response = await axios.get(`http://localhost:3000/product/${id}`);
        console.log(response.data);
        setData(response.data);
        console.log(data);
    };
    useEffect(() => {
        sendRequest();
    }, []);

    const submitHandler = (event) => {
        event.preventDefault();
        axios({
            url: `http://localhost:3000/order/reg/${id}`, // api 호출 주소
            method: 'post',
            data: {
                userIndex: userIndex,
                orderCount: orderCount,
                orderPrice: orderPrice
            }
        }).then(function orderCheck(res) {
            // 주문 성공 시
            console.log(res.data);
            navigate("/");
            alert(`${detailData.proName} 물건 구매 완료했습니다.`)
        })
    }


    return (



        <div className='di'>

        {cookies.get("loginCookie") === undefined ? 
        
        <div>
            <h1>로그인 후 이용해주세요</h1>
            <Link to="/login"><h2>로그인 하러가기</h2></Link>
            <Link to="/join"><h2>회원가입 하러가기</h2></Link>
        </div> : 
        
        <div>
        <br></br>            <br></br>
        <table border="1">
            <tr>
                <th><h4>상품이름</h4></th>
                <th><h4>상품 대표 이미지</h4></th>
                <th><h4>상품 설명</h4></th>
                <th><h4>상품 상세 이미지</h4></th>
                <th><h4>가격</h4></th>
                <th><h4>개수</h4></th>
                <th></th>
            </tr>

            <td>{detailData.proName}</td>
            <td><img src={detailData.proProfile}></img></td>
            <td>{detailData.proContents}</td>
            <td><img src={detailData.proDetailImg}></img></td>
            <td>{detailData.proPrice}</td>
            <td>{detailData.proCount}</td>
        </table>
        <br></br>        <br></br>

        <form className='frmNewAcc' onSubmit={submitHandler}>
            구매 수량
            <input type="number" value={orderCount} max={detailData.proCount} onChange={orderCountHandler} ></input>
            구매 가격
            <input type="text" value={orderCount * detailData.proPrice} onChange={orderCountHandler}></input>
            <input type="submit" value="구매"></input>
        </form>
        </div>

        }



        </div>
        
    );
}




export default Order;