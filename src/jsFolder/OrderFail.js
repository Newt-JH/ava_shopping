import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link,useParams,useNavigate } from 'react-router-dom';

function OrderFail() {

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/");
        alert(`주문에 실패하였습니다. 다시 시도해주세요.`)
    }, []);

    return (
        <>
        </>
    )


}

export default OrderFail;