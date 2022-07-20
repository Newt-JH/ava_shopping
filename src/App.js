import './cssFolder/App.css';
import React from 'react';
import { BrowserRouter, Route, Routes, Link, Switch } from "react-router-dom";
import Head from './jsFolder/Head.js';
import Login from './jsFolder/Login';
import Join from './jsFolder/Join';
import ProAll from './jsFolder/ProAll';
import ProDetail from './jsFolder/ProDetail';
import Search from './jsFolder/Serch';
import Order from './jsFolder/Order';
import Main from './jsFolder/Main';
import Mypage from './jsFolder/Mypage';
import Mywish from './jsFolder/Mywish';
import MyInfo from './jsFolder/MyInfo';
import GameItemCate from './jsFolder/GameItemCate';
import GameList from './jsFolder/GameList';
import AdminPage from './jsFolder/AdminPage'
import AdminEdit from './jsFolder/AdminEdit';
import AdminProAll from './jsFolder/Component/AdminProAll';
import ProReg from './jsFolder/Component/ProReg'
import AdminUser from './jsFolder/AdminUser';

function App() {


  return (
    <div className='main1'>
      <BrowserRouter>
        <Head />

        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/join" element={<Join />}></Route>
          {/* 전체 글 */}
          <Route path="/product" element={<ProAll />}></Route>
          {/* 글 상세 페이지 */}
          <Route path="/product/:id" element={<ProDetail />}></Route>
          {/* 글 검색 페이지 */}
          <Route path="/product/serch/:id" element={<Search />}></Route>
          {/* 카테고리 페이지 */}
          <Route path="/gamecate/id=:id&game=:game" element={<GameItemCate />}></Route>
          {/* 게임 페이지 */}
          <Route path="/product/game/:id" element={<GameList />}></Route>
          {/* 주문 페이지 */}
          <Route path="/order/:id" element={<Order />}></Route>
          {/* 구매 목록 페이지 */}
          <Route path="/mypage/:id" element={<Mypage />}></Route>
          {/* 찜목록 페이지 */}
          <Route path="/mywish/:id" element={<Mywish />}></Route>
          {/* 내 정보 페이지 */}
          <Route path="/myinfo/:id" element={<MyInfo />}></Route>
          {/* 어드민 페이지 */}
          <Route path="/admin" element={<AdminPage />}></Route>
          {/* 어드민 글 전체 보기 페이지 */}
          <Route path="/admin/proall" element={<AdminProAll />}></Route>
          {/* 어드민 글 전체 보기 페이지 */}
          <Route path="/admin/proreg" element={<ProReg />}></Route>
          {/* 어드민 글 수정 페이지 */}
          <Route path="/admin/productedit/:id" element={<AdminEdit />}></Route>
          {/* 어드민 유져 관리 페이지 */}
          <Route path="/admin/user" element={<AdminUser />}></Route>

        </Routes>

      </BrowserRouter>
    </div>

  );
}

export default App;
