import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, Link, Switch } from "react-router-dom";
import Head from './Head.js';
import Login from './Login';
import Join from './Join';
import ProReg from './ProReg';
import ProAll from './ProAll';
import ProDetail from './ProDetail';
import Search from './Serch';
import Order from './Order';

function App() {


  return (
    <div className='main'>
      <BrowserRouter>
        <Head />

        <Routes>
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
          {/* 주문 페이지 */}
          <Route path="/order/:id" element={<Order />}></Route>
        </Routes>

      </BrowserRouter>
    </div>

  );
}

export default App;
