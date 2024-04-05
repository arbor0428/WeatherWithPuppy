import React from 'react';
import { Link } from 'react-router-dom';
import ClearPaw from '../assets/img/clearPaw.png';

function Home() {

    return (
        <section className="welcome">
            <div className='welcome__box'>
                <h1 className='logo'>
                    <img className='logo__img' src={ClearPaw} alt="logo" />
                    <span className='logo__title'>ClearPaw</span>
                </h1>
                <h2 className='welcome__box__title'>미세먼지 측정 강아지 산책 가이드</h2>
                <Link className="btn goto" to='/SearchWeather'>
                    측정하기
                </Link>
            </div>
        </section>
    );
}

export default Home;
