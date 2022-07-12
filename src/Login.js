import axios from 'axios';
import './Login.css'
import React ,{Component, useState} from 'react';
import { useNavigate } from "react-router-dom";
import {Cookies} from 'react-cookie'

const cookies = new Cookies();


function Login() {

    const [id, setID] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const idChangeHandler = (e) => {
      setID(e.target.value);
    }
  
    const passwordChangeHandler = (e) => {
      setPassword(e.target.value);
    }
  
    const submitHandler = (event) => {
      event.preventDefault();
      axios({
        url: 'http://localhost:3000/user/login', // api 호출 주소
        method: 'post',
        data: {
          userID: id,
          userPassword: password
        }
      })
      .then(function loginCheck(res){
        if(res.data.me === "OK"){
          const time = 1000*60*15;
            // 로그인 성공 시
            console.log(res.data.token);
            console.log(res.data.userIndex);
            if(cookies.get("loginCookie") === undefined){
              cookies.set("loginCookie", res.data.token, { path: "/", expires : new Date(Date.now() + time) })
              cookies.set("userIndex",res.data.userIndex, { path: "/", expires : new Date(Date.now() + time) })
            }else{
              console.log("쿠키가 이미 있음");
            }
            navigate("/");
        }else{
            // 로그인 실패 시
            alert(`로그인이 실패하였습니다.`);
            console.log(res.data);
        }

      })
    }
  
  return (
    <>
<form className='frmNewAcc' onSubmit={submitHandler}>
		<input type="text" value={id} minLength="4" onChange={idChangeHandler} ></input>
        <input type="password" value={password}  minLength="4" onChange={passwordChangeHandler}></input>
        <input type="submit" value="로그인"></input>
</form>
    </>

  );
}

export default Login;
