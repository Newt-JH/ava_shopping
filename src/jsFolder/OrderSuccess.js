import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link,useParams,useNavigate } from 'react-router-dom';

function OrderSuccess(props) {

    const params = new URLSearchParams(window.location.search);

    const amount = params.get("amount");
    console.log(amount);
    const { prodID } = useParams();
    const { userIndex } = useParams();
    const { orderCount } = useParams();
    console.log(prodID);
    console.log(userIndex);
    console.log(orderCount);

    const navigate = useNavigate();

    //페이지 진입 시 글 읽어오기

    const sendRequest =
        async () => {
            axios({
                url: `http://localhost:3000/order/reg/${prodID}`, // api 호출 주소
                method: 'post',
                data: {
                    userIndex: userIndex,
                    orderCount: orderCount,
                    orderPrice: amount
                }
            }).then(function orderCheck(res) {
                // 주문 성공 시
                console.log(res.data);
                navigate("/");
                alert(`${res.data}`)
            })

        };
    useEffect(() => {
        sendRequest();
    }, []);



    return (

        <>
        </>

    )


}

export default OrderSuccess;