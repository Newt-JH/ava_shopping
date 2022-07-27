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
        {(data[0].proindex) === undefined ?  
        <div>aa</div>   
        :     
        <div className='mainWrap'>
            <div className='product-title'>

                <div className='best-img-div'>
                    <Link to={"/product/" + data[0].proindex}>
                        <img className='best-img' src={data[0].proprofile}></img>
                    </Link>
                </div>
                <div className='best-img-div'>
                    <Link to={"/product/" + data[1].proindex}>
                        <img className='best-img' src={data[1].proprofile}></img>
                    </Link>
                </div>
                <div className='best-img-div'>
                    <Link to={"/product/" + data[2].proindex}>
                        <img className='best-img' src={data[2].proprofile}></img>
                    </Link>
                </div>
            </div>

            <div className='product-title2'>
                <div className='best-img-div'>
                    <Link to={"/product/" + data[3].proindex}>
                        <img className='best-img' src={data[3].proprofile}></img>
                    </Link>
                </div>
                <div className='best-img-div'>
                    <Link to={"/product/" + data[4].proindex}>
                        <img className='best-img' src={data[4].proprofile}></img>
                    </Link>
                </div>
            </div>


        </div> }


    </>
    )


}

export default CateBest;