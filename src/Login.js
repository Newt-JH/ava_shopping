import axios from 'axios';
import './Login.css'
import React, { Component, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Cookies } from 'react-cookie'


import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


const cookies = new Cookies();


function Login() {

  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [idCheckDiv, setidCheckDiv] = useState('');

  const idChangeHandler = (e) => {
    setID(e.target.value)

    if(e.target.value.length > 3){
      axios({
        url: 'http://localhost:3000/user/join/idcheck', // api 호출 주소
        method: 'post',
        data: {
          userID: e.target.value,
        }
      }).then(function idCh(res) {
          // ID 중복 체크
          setidCheckDiv(res.data)  
          console.log(res.data)
      })
    }else{
      setidCheckDiv("NO");
    }
  }

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if(idCheckDiv === "NO"){
      axios({
        url: 'http://localhost:3000/user/login', // api 호출 주소
        method: 'post',
        data: {
          userID: id,
          userPassword: password
        }
      })
        .then(function loginCheck(res) {
          if (res.data.me === "OK") {
            const time = 1000 * 60 * 15;
            // 로그인 성공 시
            console.log(res.data.token);
            console.log(res.data.userIndex);
            if (cookies.get("loginCookie") === undefined) {
              cookies.set("loginCookie", res.data.token, { path: "/", expires: new Date(Date.now() + time) })
              cookies.set("userIndex", res.data.userIndex, { path: "/", expires: new Date(Date.now() + time) })
            } else {
              console.log("쿠키가 이미 있음");
            }
            navigate("/");
          } else {
            // 로그인 실패 시
            alert(`로그인이 실패하였습니다.`);
            console.log(res.data);
          }
  
        })
    }else{
      alert("존재하지 않는 아이디입니다.")
    }
    
  }

  return (
    <>

      <form onSubmit={submitHandler}>
        <div class="wrapper">
          <h1 className='h1'>Log In</h1>

          <div class="email">
            <input className='logInput' type="text" value={id} minLength="4" onChange={idChangeHandler} placeholder="ID"></input><br />
          </div>

          <div class="password">
            <input className='logInput' type="password" value={password} minLength="4" onChange={passwordChangeHandler} placeholder="Password"></input><br />
          </div>

          {/* <button className='subButton'></button> */}
          <Stack spacing={2} direction="row" marginTop="30px">
            <Button type='submit' variant="outlined" >Login</Button>
          </Stack>


        </div>
      </form>
    </>
  );
}

export default Login;
