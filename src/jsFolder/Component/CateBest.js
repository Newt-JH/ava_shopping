import '../../cssFolder/CateBest.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CateBest(props) {

    const [data, setData] = useState([{}]);

    // 페이지 진입 시 글 읽어오기

    const sendRequest =
        async () => {
            const response = await axios.get(`http://localhost:3000/product/best/product`);
            setData(response.data);
        };
    useEffect(() => {
        sendRequest();
    }, []);



    return (
    
    <>
        {(data[0].pi) === undefined ?  
        <div></div>   
        :     
        <div className='mainWrap'>
            <div className='product-title'>

                <div className='best-img-div'>
                    <Link to={"/product/" + data[0].pi}>
                        <img className='best-img' src={data[0].proProfile}></img>
                    </Link>
                </div>
                <div className='best-img-div'>
                    <Link to={"/product/" + data[1].pi}>
                        <img className='best-img' src={data[1].proProfile}></img>
                    </Link>
                </div>
                <div className='best-img-div'>
                    <Link to={"/product/" + data[2].pi}>
                        <img className='best-img' src={data[2].proProfile}></img>
                    </Link>
                </div>
            </div>

            <div className='product-title2'>
                <div className='best-img-div'>
                    <Link to={"/product/" + data[3].pi}>
                        <img className='best-img' src={data[3].proProfile}></img>
                    </Link>
                </div>
                <div className='best-img-div'>
                    <Link to={"/product/" + data[4].pi}>
                        <img className='best-img' src={data[4].proProfile}></img>
                    </Link>
                </div>
            </div>


        </div> }


    </>
    )


}

export default CateBest;