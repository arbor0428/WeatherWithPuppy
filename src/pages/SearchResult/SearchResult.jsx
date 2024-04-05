import React from 'react';
import { useLocation, Navigate, useParams } from 'react-router-dom';
import GoodAirQuality from '../../components/GoodAirQuality';
import BadAirQuality from '../../components/BadAirQuality';
import AirQualityWithImage from '../../components/AirQualityWithImage';

function getCategory(value) {
    if(value >= 0 && value <= 15) {
        return '좋음';
    } else if (value >= 16 && value <= 35) {
        return '보통'
    } else if (value >= 36 && value <= 75) {
        return '나쁨';
    } else if (value >= 76){
        return '매우나쁨'
    }else if (value === "-" || value === "" || value === undefined){
        return '정보없음'
    }
}

function SearchResult() {
    const { cityName } = useParams();
    const location = useLocation();
    const searchData = location.state.searchData; // Optional chaining 사용

    if (!searchData) {
        return <Navigate to="/not-found" />; // 데이터가 없는 경우 NotFound 페이지로 리다이렉션
    }

    const airQualityCategory = getCategory(searchData.pm10Value);

    return (
        <section className='searchresult'>
            <h2>현재 계신 위치: {cityName}</h2>
            <article>

                {airQualityCategory === '좋음' && <AirQualityWithImage imageSrc="../logo.svg" alt="좋음" text={airQualityCategory} />}
                {airQualityCategory === '보통' && <AirQualityWithImage imageSrc="../logo.svg" alt="보통" text={airQualityCategory} />}
                {airQualityCategory === '나쁨' && <AirQualityWithImage imageSrc="../logo.svg" alt="나쁨" text={airQualityCategory} />}
                {airQualityCategory === '매우나쁨' && <AirQualityWithImage imageSrc="../logo.svg" alt="매우나쁨" text={airQualityCategory} />}
                
                <div>
                    <p>미세먼지: {searchData.pm10Value} µg/m³</p>
                    <p>초미세먼지: {searchData.pm25Value} µg/m³</p>
                </div>
            </article>
            <article>
                {(airQualityCategory === '좋음' || airQualityCategory === '보통') && <GoodAirQuality />} 
                {(airQualityCategory === '나쁨' || airQualityCategory === '매우나쁨') && <BadAirQuality />} 
            </article>
        </section>
    );
}

export default SearchResult;
