import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import ClearPaw from '../assets/img/clearPaw.png';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // useNavigate 사용

    //로그인 상태 확인
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
        return unsubscribe;
    }, []);

    const handleNavigation = () => {
        //로그인시
        if (isLoggedIn) {
            navigate('/SearchWeather');
        //로그인 아닌 경우
        } else {
            navigate('/LoginPage');
        }
    };

    return (
        <section className="welcome">
            <div className='welcome__box'>
                <h1 className='logo'>
                    <img className='logo__img' src={ClearPaw} alt="logo" />
                    <span className='logo__title'>ClearPaw</span>
                </h1>
                <h2 className='welcome__box__title'>미세먼지 측정 강아지 산책 가이드</h2>
                <button className="btn goto" onClick={handleNavigation}>
                    측정하기
                </button>
            </div>
        </section>
    );
}

export default Home;
