import { BrowserRouter, Route, Routes, Link, Switch } from "react-router-dom";
import React, { Component, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Join.css'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Join() {

  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, reetPassword] = useState('');
  const [email, setEmail] = useState('');
  const [idCheckDiv, setidCheckDiv] = useState('');
  const [idCheckA, setidCheckA] = useState('아이디를 입력해주세요.');
  const [joinCheckList, setJoinCheckList] = useState('');
  const navigate = useNavigate();


  const idChangeHandler = (e) => {
    setID(e.target.value)

    if (e.target.value.length > 3) {
      axios({
        url: 'http://localhost:3000/user/join/idcheck', // api 호출 주소
        method: 'post',
        data: {
          userID: e.target.value,
        }
      }).then(function idCh(res) {
        // ID 중복 체크
        setidCheckDiv(res.data)
        if (res.data === "OK") {
          setidCheckA("회원 가입 가능한 아이디입니다.")
        } else {
          setidCheckA("가입이 불가한 아이디입니다.")
        }

      })
    } else {
      setidCheckA("아이디 길이는 4~10글자로 입력해주세요.")
      setidCheckDiv("NO");
    }
  }

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  }

  const repasswordChangeHandler = (e) => {
    reetPassword(e.target.value);
  }

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  }

  const submitHandler = (event) => {

    event.preventDefault();

    if (idCheckDiv === "OK") {
      if (password !== repassword) {
        alert("비밀번호를 동일하게 입력 후 버튼을 눌러주세요.")
      } else if (email.includes("@")) {

        axios({
          url: 'http://localhost:3000/user/reg', // api 호출 주소
          method: 'post',
          data: {
            userID: id,
            userPassword: password,
            userEmail: email
          }
        }).then(function loginCheck(res) {
          // 회원가입 성공 시
          console.log(res.data);
          setJoinCheckList("OK")
          navigate("/");
          alert(`${id} 고객님 회원가입 성공했습니다.`)
        })

      }
      else {
        alert("이메일에 @를 포함해주세요.")
      }
    } else if (idCheckDiv === "NO") {
      alert("아이디 확인 후 버튼을 눌러주세요.")
    }

  }

  const idCheck = (event) => {
    event.preventDefault();

  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <div class="wrapper">
          <h1 className='h1'>Join</h1>

          <div class="email">
            <input className="logInput" type="text" value={id} onChange={idChangeHandler} minLength="4" maxLength="10" placeholder="ID"></input>
          </div>
          {/* <button onClick={idCheck}>아이디 중복 체크</button> */}
          {idCheckDiv === "OK" ? <a>{idCheckA}</a> : <a>{idCheckA}</a>}<br />

          <div class="password">
            <input className='logInput' type="password" value={password} minLength="4" maxLength="10" onChange={passwordChangeHandler} placeholder="Password"></input><br />
          </div>

          <div class="email">
            <input className='logInput' type="password" value={repassword} minLength="4" maxLength="10" onChange={repasswordChangeHandler} placeholder="비밀번호 재입력"></input>
          </div>

          {password !== repassword ? <a>비밀번호가 틀립니다.</a> : <a></a>}<br></br>

          <div class="password">
            <input className="logInput" type="text" value={email} onChange={emailChangeHandler} placeholder="Email"></input>
          </div>

          <Stack spacing={2} direction="row" marginTop="30px">
            <Button type='submit' variant="outlined" >Join</Button>
          </Stack>
        </div>
      </form>
    </>
  );
}

export default Join;