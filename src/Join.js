import { BrowserRouter, Route, Routes, Link, Switch } from "react-router-dom";
import React, { Component, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Join() {

  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, reetPassword] = useState('');
  const [email, setEmail] = useState('');
  const [idCheckDiv, setidCheckDiv] = useState('');
  const [idCheckA, setidCheckA] = useState('중복 체크 버튼을 눌러주세요.');
  const [joinCheckList, setJoinCheckList] = useState('');
  const navigate = useNavigate();


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
          if(res.data === "OK"){
            setidCheckA("회원 가입 가능한 아이디입니다.")
          }else{
            setidCheckA("가입이 불가한 아이디입니다.")
          }
  
      })
    }else{
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

    if(idCheckDiv === "OK"){
       if(password !== repassword){
        alert("비밀번호를 동일하게 입력 후 버튼을 눌러주세요.")
      }else if(email.includes("@")){

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
      else{
        alert("이메일에 @를 포함해주세요.")
      }
    } else if(idCheckDiv === "NO"){
      alert("아이디 확인 후 버튼을 눌러주세요.")
    }

  }

  const idCheck = (event) => {
    event.preventDefault();

  }

  return (
    <>
      <form className='frmNewAcc' onSubmit={submitHandler}>
        아이디<input type="text" value={id} onChange={idChangeHandler} maxLength="10"></input>
        {/* <button onClick={idCheck}>아이디 중복 체크</button> */}
          {idCheckDiv === "OK" ? <a>{idCheckA}</a> : <a>{idCheckA}</a>}<br />
        비밀번호 ( 4자 이상, 10자 이하 )
        <input type="password" value={password} onChange={passwordChangeHandler} minLength="4" maxLength="10"></input><br />
        비밀번호 재확인
        <input type="password" value={repassword} onChange={repasswordChangeHandler}></input>
        {password !== repassword ? <a>비밀번호가 틀립니다.</a> : <a></a>}<br />
        이메일
        <input type="text" value={email} onChange={emailChangeHandler}></input><br />
        <input type="submit" value="회원가입"></input>
      </form>
    </>
  );
}

export default Join;