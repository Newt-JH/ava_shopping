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

  const [cateIndextwo, setCateIndextwo] = useState('none');
  const [cateIndexthree, setCateIndexthree] = useState('none');

  const navigate = useNavigate();

  const cateIndexHandler = (e) => {
    setCateIndex(e.target.value);
  }

  const cateIndexHandler2 = (e) => {
    setCateIndextwo(e.target.value);
  }

  const cateIndexHandler3 = (e) => {
    setCateIndexthree(e.target.value);
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
    formData.append('cateIndextwo',cateIndextwo);
    formData.append('cateIndexthree',cateIndexthree);
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
        카테고리 1번
        <select value={cateIndex} onChange={cateIndexHandler}>
          <option value="1" hidden={cateIndextwo === "1" || cateIndexthree === "1" ? true : false}>무기</option>
          <option value="2" hidden={cateIndextwo === "2" || cateIndexthree === "2" ? true : false}>방어구</option>
          <option value="3" hidden={cateIndextwo === "3" || cateIndexthree === "3" ? true : false}>장신구</option>
          <option value="4" hidden={cateIndextwo === "4" || cateIndexthree === "4" ? true : false}>펫</option>
          <option value="5" hidden={cateIndextwo === "5" || cateIndexthree === "5" ? true : false}>설치</option>
          <option value="10" hidden={cateIndextwo === "10" || cateIndexthree === "10" ? true : false}>캐시</option>
        </select><br />

        카테고리 2번
        <select value={cateIndextwo} onChange={cateIndexHandler2}>
          <option value="none"> ---- </option>
          <option value="1" hidden={cateIndex === "1" || cateIndexthree === "1" ? true : false}>무기</option>
          <option value="2" hidden={cateIndex === "2" || cateIndexthree === "2" ? true : false}>방어구</option>
          <option value="3" hidden={cateIndex === "3" || cateIndexthree === "3" ? true : false}>장신구</option>
          <option value="4" hidden={cateIndex === "4" || cateIndexthree === "4" ? true : false}>펫</option>
          <option value="5" hidden={cateIndex === "5" || cateIndexthree === "5" ? true : false}>설치</option>
          <option value="10" hidden={cateIndex === "10" || cateIndexthree === "10" ? true : false}>캐시</option>
        </select><br />

        카테고리 3번
        <select value={cateIndexthree} onChange={cateIndexHandler3}>
        <option value="none"> ---- </option>
          <option value="1" hidden={cateIndex === "1" || cateIndextwo === "1" ? true : false}>무기</option>
          <option value="2" hidden={cateIndex === "2" || cateIndextwo === "2" ? true : false}>방어구</option>
          <option value="3" hidden={cateIndex === "3" || cateIndextwo === "3" ? true : false}>장신구</option>
          <option value="4" hidden={cateIndex === "4" || cateIndextwo === "4" ? true : false}>펫</option>
          <option value="5" hidden={cateIndex === "5" || cateIndextwo === "5" ? true : false}>설치</option>
          <option value="10" hidden={cateIndex === "10" || cateIndextwo === "10" ? true : false}>캐시</option>
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
