import React, { Component, useState } from 'react';
import { BrowserRouter, Route, Routes, Link, Switch } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function ProReg() {
  const [cateIndex, setCateIndex] = useState('');
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
        navigate("/");
        alert(`${proName} 상품 등록 완료했습니다.`)
    })
  }

  return (
    <>
      <form className='frmNewAcc' encType='multipart/form-data' onSubmit={submitHandler}>
        카테고리 번호
        <input type="number" value={cateIndex} onChange={cateIndexHandler}></input>
        상품 이름
        <input type="text" value={proName} onChange={proNameHandler}></input>
        상품 프로필 사진
        <input type="text" value={proProfile} onChange={proProfileHanlder}></input>
        상품 설명
        <input type="text" value={proContents} onChange={proContentsHandler}></input>
        상품 상세 이미지
        <input type="file" name='proDetailImg' onChange={proDetailImgHandler}></input>
        상품 가격
        <input type="number" value={proPrice} onChange={proPriceHandler}></input>
        상품 개수
        <input type="number" value={proCount} onChange={proCountHandler}></input>

        <input type="submit" value="상품 등록"></input>
      </form>
    </>
  );
}

export default ProReg;
