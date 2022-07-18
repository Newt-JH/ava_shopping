import './Head.css'
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Cookies } from 'react-cookie'
import jwt_decode from "jwt-decode";

function Head() {

    const cookies = new Cookies();

    const [serch, setSearch] = useState('');
    const navigate = useNavigate();



    // JWT 토큰 가져와서 디코딩
    // 토큰이 없을 경우 예외 처리를 위해 index값 0으로 초기 설정
    // 토큰 있다면 index값을 유저 index로 변환 / 토큰 없다면 index는 0

    let index = 0;
    const jwttoken = cookies.get("loginCookie");
    if(jwttoken !== undefined){
        var decToken = jwt_decode(jwttoken);
        index = decToken.userIndex;
    }else{
        index = 0;
    }

    const serchHandler = (e) => {
        setSearch((String(e.target.value)).replace(/\//g,""));
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
                        <Link to="/join"><button className='join'>회원가입</button></Link>
                        <Link to="/login"><button className='login'>로그인</button></Link>
                    </div>
                    :
                    <div align="right" className='divv2'>
                        <button className='logout' onClick={logoutOnclick}>로그아웃</button>
                        <Link to={"/mywish/" + index}><button className='mypage'>찜목록</button></Link>
                        <Link to={"/mypage/" + index}><button className='mypage'>구매목록</button></Link>
                        <Link to={"/myinfo/" + index}><button className='mypage'>내 정보</button></Link>
                    </div>
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