import axios from 'axios';
import '../cssFolder/Login.css'
import React, { useState } from 'react';
import { useNavigate,Link } from "react-router-dom";
import { Cookies } from 'react-cookie'


import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';





function LoginTwo() {

  const cookies = new Cookies();

  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [idCheckDiv, setidCheckDiv] = useState('');

  const idChangeHandler = (e) => {
    setID(e.target.value)
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
      }).then(function loginCheck(res){
        if(res.data.me === "OK"){
          const time = 1000 * 60 * 15;
          if (cookies.get("loginCookie") === undefined) {
            cookies.set("loginCookie", res.data.token, { path: "/", expires: new Date(Date.now() + time) })
          } else {
            console.log("쿠키가 이미 있음");
          } 
          navigate("/");
        }else if(res.data.me === "admin"){
          const time = 1000 * 60 * 15;
          cookies.set("adminCookie", res.data.token, { path: "/", expires: new Date(Date.now() + time) })
          navigate("/");
        }else
        {
          // 로그인 실패 시
          alert(res.data);
          console.log(res.data);
        }
      })
      

  }

  return (
    <>

      <form onSubmit={submitHandler}>
        <div class="wrapper1">
          <h1 className='h1'>Log In</h1>

          <div class="email">
            <input className='logInput' type="text" value={id} minLength="4" maxLength="10" onChange={idChangeHandler} placeholder="ID"></input><br />
          </div>

          <div class="password">
            <input className='logInput' type="password" value={password} minLength="4" maxLength="10" onChange={passwordChangeHandler} placeholder="Password"></input><br />
          </div>
          <Link to="/join"><h3>회원이 아니십니까?</h3></Link>
          {/* <button className='subButton'></button> */}
          <Stack spacing={2} direction="row" marginTop="30px">
            <Button type='submit' variant="outlined" >Login</Button>
          </Stack>


        </div>
      </form>
    </>
  );
}

export default LoginTwo;
