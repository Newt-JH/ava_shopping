import './Head.css'
import React, { Component,useState } from 'react';
import { BrowserRouter, Route, Routes, Link, Switch } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {Cookies} from 'react-cookie'

const cookies = new Cookies();



function Head() {

    const [serch, setSearch] = useState('');
    const navigate = useNavigate();

    const serchHandler = (e) => {
        setSearch(e.target.value);
      }

      const serchPage = (e) => {
        if(serch.length === 0){
            alert("검색어를 입력하세요.")
        }
        else{
            navigate(`/product/serch/`+serch);
      }
    }

    const time = 10000;

    const logoutOnclick = (e) => {
        cookies.set("loginCookie", "쿠키 삭제", { path: "/", expires : new Date(Date.now() - time) })
        cookies.set("userIndex", "쿠키 삭제", { path: "/", expires : new Date(Date.now() - time) })
        navigate(`/`);
    }


    
    return (
        <div vertical-align="middle" className='di'>
            <div className='divv'>
                <Link to="/"><img src='/img/logo.png'></img></Link>
            </div>
            {cookies.get("loginCookie") === undefined ? 
            <div align="right" className='divv2'>
                <Link to="/login"><span><strong>로그인</strong></span></Link>
                <Link to="/join"><span><strong>회원가입</strong></span></Link>
            </div>
            :
            <div align="right" className='divv2'><button onClick={logoutOnclick}><strong>로그아웃</strong></button></div>
            }


            <form className='frmNewAcc'>
                <input type="text" value={serch} onChange={serchHandler}></input>
                <button onClick={serchPage}>검색</button>
                {/* <Link to={"/product/serch/"+ serch}><input type="submit" value="검색"></input></Link> */}
            </form>
        </div>
    );
}

export default Head;