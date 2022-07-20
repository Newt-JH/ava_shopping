import React from 'react';
import '../cssFolder/Main.css';
import CateBest from './Component/CateBest';

function Main(props) {

    return (<>
    <div className='wrap'>
    <h1>카테고리별 Best 상품</h1>
    </div>
    <CateBest />
</>)


}

export default Main;