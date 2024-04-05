import React from 'react';
import { Link } from 'react-router-dom';

function Home() {

    return (
        <section className="welcome">
            <h1>ClearPaw</h1>
            <h2>미세먼지 측정 강아지 산책 가이드</h2>
            <Link className="btn goto" to='/SearchWeather'>
                측정하기
            </Link>
        </section>
    );
}

export default Home;
