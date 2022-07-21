import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Link, Switch, useParams,useNavigate } from "react-router-dom";
import { Cookies } from 'react-cookie'

function AdminPage() {

    const cookies = new Cookies();
    const navigate = useNavigate();

    const adminCookie = cookies.get("adminCookie");

    function notAdmin(){
        if(adminCookie === undefined){
            alert("비정상적인 접근입니다.")
            navigate("/");
        }
    }
    useEffect(() => {
        notAdmin();
    }, []);


    return (

        <div className='main1'>

            <Link to="/admin/proall"><a>상품 전체 보기</a></Link> <br /><br />
            <Link to="/admin/proreg"><a>상품 등록</a></Link><br /><br />
            <Link to="/admin/user"><a>유저 관리</a></Link>
        </div>

    );
}

export default AdminPage;
