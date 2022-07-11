import { BrowserRouter, Route, Routes, Link, Switch } from "react-router-dom";
import React, { Component, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Join() {

  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const idChangeHandler = (e) => {
    setID(e.target.value);
  }

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  }

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();
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
        navigate("/");
        alert(`${id} 고객님 회원가입 성공했습니다.`)
    })
  }

  return (
    <>
      <form className='frmNewAcc' onSubmit={submitHandler}>
        아이디<input type="text" value={id} onChange={idChangeHandler}></input>
        비밀번호
        <input type="password" value={password} onChange={passwordChangeHandler}></input>
        이메일
        <input type="text" value={email} onChange={emailChangeHandler}></input>
        <input type="submit" value="회원가입"></input>
      </form>
    </>
  );
}

export default Join;