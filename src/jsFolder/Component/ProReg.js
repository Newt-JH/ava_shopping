import React, { Component, useState } from 'react';
import { BrowserRouter, Route, Routes, Link, Switch } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function ProReg() {
  const [cateIndex, setCateIndex] = useState('1');
  const [gameIndex, setGameIndex] = useState('1');
  const [proName, setproName] = useState('');
  const [proProfile, setproProfile] = useState('');
  const [proContents, setproContents] = useState('');
  const [proDetailImg, setproDetailImg] = useState();
  const [proPrice, setproPrice] = useState('');
  const [proCount, setproCount] = useState('');

  const navigate = useNavigate();

  const cateIndexHandler = (e) => {
    setCateIndex(e.target.value);
  }

  const gameIndexHandler = (e) => {
    setGameIndex(e.target.value);
  }

  const proNameHandler = (e) => {
    setproName(e.target.value);
  }

  const proProfileHanlder = (e) => {
    setproProfile(e.target.value);
  }

  const proContentsHandler = (e) => {
    setproContents(e.target.value);
  }

  const proDetailImgHandler = (e) => {
    setproDetailImg(e.target.files[0]);
    console.log(e.target.files);
  }

  const proPriceHandler = (e) => {
    setproPrice(e.target.value);
  }

  const proCountHandler = (e) => {
    setproCount(e.target.value);
  }


  const submitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('cateIndex',cateIndex);
    formData.append('gameIndex',gameIndex);
    formData.append('proName',proName);
    formData.append('proProfile',proProfile);
    formData.append('proContents',proContents);
    formData.append('proDetailImg',proDetailImg);
    formData.append('proPrice',proPrice);
    formData.append('proCount',proCount);
    
    axios({
      url: 'http://localhost:3000/product/reg', // api 호출 주소
      method: 'post',
      data: formData,
      headers:{
        'Content-Type': 'multipart/form-data',
      }
    }).then(function regCheck(res) {
        console.log(res.data);
        navigate("/admin/proall");
        alert(`${proName} 상품 등록 완료했습니다.`)
    })
  }

  return (
    <>
      <form className='frmNewAcc' encType='multipart/form-data' onSubmit={submitHandler}>
        카테고리 이름
        {/* <input type="number" value={cateIndex} onChange={cateIndexHandler} max="5"></input><br></br> */}
        <select onChange={cateIndexHandler}>
          <option value="1">무기</option>
          <option value="2">방어구</option>
          <option value="3">장신구</option>
          <option value="4">펫</option>
          <option value="5">설치</option>
          <option value="11">캐시 무기</option>
          <option value="12">캐시 방어구</option>
          <option value="13">캐시 장신구</option>
          <option value="14">캐시 펫</option>
          <option value="15">캐시 설치</option>
        </select><br />

        게임 이름
        {/* <input type="number" value={cateIndex} onChange={cateIndexHandler} max="5"></input><br></br> */}
        <select onChange={gameIndexHandler}>
          <option value="1">메이플스토리</option>
          <option value="2">마인크래프트</option>
          <option value="3">로스트아크</option>
        </select><br />

        상품 이름
        <input type="text" value={proName} onChange={proNameHandler}></input><br></br>
        {/* 상품 프로필 사진
        <input type="text" value={proProfile} onChange={proProfileHanlder}></input> */}
        상품 설명
        <input type="text" value={proContents} onChange={proContentsHandler}></input><br></br>
        상품 이미지
        <input type="file" name='proDetailImg' onChange={proDetailImgHandler}></input><br></br>
        상품 가격
        <input type="number" value={proPrice} onChange={proPriceHandler}></input><br></br>
        상품 개수
        <input type="number" value={proCount} onChange={proCountHandler}></input><br></br>

        <input type="submit" value="상품 등록"></input>
      </form>
    </>
  );
}

export default ProReg;
