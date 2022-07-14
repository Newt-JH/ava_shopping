import './CateBest.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CateBest(props) {

    const [data1, setData1] = useState([{}]);
    const [data2, setData2] = useState([{}]);
    const [data3, setData3] = useState([{}]);
    const [data4, setData4] = useState([{}]);
    const [data5, setData5] = useState([{}]);

    // 페이지 진입 시 글 읽어오기

    const sendRequest1 =
        async () => {
            const response = await axios.get(`http://localhost:3000/product/best/1`);
            setData1(response.data);
        };

    const sendRequest2 =
        async () => {
            const response = await axios.get(`http://localhost:3000/product/best/2`);
            setData2(response.data);
        };

    const sendRequest3 =
        async () => {
            const response = await axios.get(`http://localhost:3000/product/best/3`);
            setData3(response.data);
        };

    const sendRequest4 =
        async () => {
            const response = await axios.get(`http://localhost:3000/product/best/4`);
            setData4(response.data);
        };

    const sendRequest5 =
        async () => {
            const response = await axios.get(`http://localhost:3000/product/best/5`);
            setData5(response.data);
        };

    useEffect(() => {
        sendRequest1();
        sendRequest2();
        sendRequest3();
        sendRequest4();
        sendRequest5();
    }, []);



    return (<>

        <div className='mainWrap'>
            <div className='product-title'>

                <div className='best-img-div'>
                    <Link to={"/product/" + data1[0].pi}>
                        <img className='best-img' src={data1[0].proProfile}></img>
                    </Link>
                </div>
                <div className='best-img-div'>
                    <Link to={"/product/" + data2[0].pi}>
                        <img className='best-img' src={data2[0].proProfile}></img>
                    </Link>
                </div>
                <div className='best-img-div'>
                    <Link to={"/product/" + data3[0].pi}>
                        <img className='best-img' src={data3[0].proProfile}></img>
                    </Link>
                </div>
            </div>

            <div className='product-title2'>
                <div className='best-img-div'>
                    <Link to={"/product/" + data4[0].pi}>
                        <img className='best-img' src={data4[0].proProfile}></img>
                    </Link>
                </div>
                <div className='best-img-div'>
                    <Link to={"/product/" + data5[0].pi}>
                        <img className='best-img' src={data5[0].proProfile}></img>
                    </Link>
                </div>
            </div>


        </div>

    </>)


}

export default CateBest;