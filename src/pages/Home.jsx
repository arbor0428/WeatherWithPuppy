import React from 'react';
import { Link } from 'react-router-dom';

function Home() {

    return (
        <>
            <div className="App">
                어서오세요 산책날씨도우미입니다
                <Link to='/SearchCity'>
                    지역 검색하러가기
                </Link>
            </div>
        </>
    );
}

export default Home;
