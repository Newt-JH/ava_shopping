import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes, Link, Switch } from "react-router-dom";
import Head from './Head.js';
import Login from './Login';
import Join from './Join';
import ProReg from './ProReg';
import ProAll from './ProAll';
import ProDetail from './ProDetail';
import Search from './Serch';
import Order from './Order';
import Main from './Main';
import Cate from './Cate';
import Mypage from './Mypage';


function App() {


  return (
    <div className='main1'>
      <BrowserRouter>
        <Head />

        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/join" element={<Join />}></Route>
          {/* 글 등록 */}
          <Route path="/proreg" element={<ProReg />}></Route>
          {/* 전체 글 */}
          <Route path="/product" element={<ProAll />}></Route>
          {/* 글 상세 페이지 */}
          <Route path="/product/:id" element={<ProDetail />}></Route>
          {/* 글 검색 페이지 */}
          <Route path="/product/serch/:id" element={<Search />}></Route>
          {/* 카테고리 페이지 */}
          <Route path="/product/cate/:id" element={<Cate />}></Route>
          {/* 주문 페이지 */}
          <Route path="/order/:id" element={<Order />}></Route>
          {/* 마이 페이지 */}
          <Route path="/mypage/:id" element={<Mypage />}></Route>
        </Routes>

      </BrowserRouter>
    </div>

  );
}

export default App;
