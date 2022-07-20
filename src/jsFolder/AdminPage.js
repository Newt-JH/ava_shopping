import React from 'react';
import { BrowserRouter, Route, Routes, Link, Switch, useParams } from "react-router-dom";


function AdminPage() {

    const { id } = useParams();
    console.log(id);
    return (

        <div className='main1'>

            <Link to="/admin/proall"><a>상품 전체 보기</a></Link> <br />
            <Link to="/admin/proreg"><a>상품 등록</a></Link>
            <Link to="/admin/user"><a>유저 관리</a></Link>
        </div>

    );
}

export default AdminPage;
