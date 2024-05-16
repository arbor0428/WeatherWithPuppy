import React, { useState, useEffect } from 'react';
import goWalk from '../assets/img/gowalk.png';
import walkSound from '../assets/mp3/walk_voice.mp3'; // 오디오 파일 경로
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function GoodAirQuality() {
    const [profileImage, setProfileImage] = useState(null)

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // 사용자가 로그인되어 있을 때 해당 url 가져오기
                setProfileImage(user.photoURL);
            } else {
                // 사용자가 로그인되어 있지 않는 경우
                setProfileImage(null);
            }
        });
        return unsubscribe;
    }, []);

    return (
        <div className='goWalk__box'>
            <p>산책하러 가자!!!</p>
            {profileImage ? (
                <img src={profileImage} alt="프로필 사진" />
            ) : (
                <img src={goWalk} alt="기본 이미지" />
            )}
            {/* 오디오 플레이어 */}
            <audio controls autoPlay>
                <source src={walkSound} type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}