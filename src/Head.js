import './Head.css'
import React, { Component, useState } from 'react';
import { BrowserRouter, Route, Routes, Link, Switch } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Cookies } from 'react-cookie'

const cookies = new Cookies();



function Head() {

    const [serch, setSearch] = useState('');
    const navigate = useNavigate();

    const serchHandler = (e) => {
        setSearch(e.target.value);
    }

    const serchPage = (e) => {
        if (serch.length === 0) {
            alert("검색어를 입력하세요.")
        }
        else {
            navigate(`/product/serch/` + serch);
        }
    }

    const time = 10000;

    const logoutOnclick = (e) => {
        cookies.set("loginCookie", "쿠키 삭제", { path: "/", expires: new Date(Date.now() - time) })
        cookies.set("userIndex", "쿠키 삭제", { path: "/", expires: new Date(Date.now() - time) })
        navigate(`/`);
    }



    return (
        <div>
            <div vertical-align="middle" className='di'>
                <div className='divv'>
                    <Link to="/"><img src='/img/logo.png' className='img'></img></Link>
                </div>



                <form className='frmNewAcc'>
                    <div className='serch'>
                        <input className='serIn' placeholder="검색어 입력" type="text" value={serch} onChange={serchHandler}></input>
                        <button className='serBu' onClick={serchPage}>검색</button>
                    </div>
                </form>


                {cookies.get("loginCookie") === undefined ?
                    <div align="right" className='divv2'>
                        <Link to="/join"><button className='login'>회원가입</button></Link>
                        <Link to="/login"><button className='join'>로그인</button></Link>
                    </div>
                    :
                    <div align="right" className='divv2'><button className='logout' onClick={logoutOnclick}>로그아웃</button></div>
                }

            </div>
            <div class="tab">
                <ul class="tabnav">
                <li className='tabli'><Link to="/product/cate/1"><a className='taba'>무기</a></Link></li>
                <li className='tabli'><Link to="/product/cate/2"><a className='taba'>방어구</a></Link></li>
                <li className='tabli'><Link to="/product/cate/3"><a className='taba'>장신구</a></Link></li>
                <li className='tabli'><Link to="/product/cate/4"><a className='taba'>펫</a></Link></li>
                <li className='tabli'><Link to="/product/cate/5"><a className='taba'>설치</a></Link></li>
                </ul>
            </div>
            </div>
            );
}

            export default Head;