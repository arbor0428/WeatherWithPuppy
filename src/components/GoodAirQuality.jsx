import React from 'react';
import goWalk from '../assets/img/gowalk.png';
import walkSound from '../assets/mp3/walk_voice.mp3'; // 오디오 파일 경로

export default function GoodAirQuality() {
    return (
        <div className='goWalk__box'>
            <p>산책하러 가자!!!</p>
            <img src={goWalk} alt="" />
            {/* 오디오 플레이어 */}
            <audio controls autoPlay>
                <source src={walkSound} type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}