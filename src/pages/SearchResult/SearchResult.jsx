import React, { useEffect} from 'react';
import { useLocation, Navigate, useParams } from 'react-router-dom';
import GoodAirQuality from '../../components/GoodAirQuality';
import BadAirQuality from '../../components/BadAirQuality';
import AirQualityWithImage from '../../components/AirQualityWithImage';
import bestIcon from '../../assets/img/best_icon.png';
import goodIcon from '../../assets/img/good_icon.png';
import badIcon from '../../assets/img/bad_icon.png';
import worstIcon from '../../assets/img/worst_icon.png';

function getCategory(value) {
    if (value >= 0 && value <= 15) {
        return { category: '좋아요', imageSrc: bestIcon, backColor: '#96d2ff' };
    } else if (value >= 16 && value <= 35) {
        return { category: '보통이에요', imageSrc: goodIcon, backColor: '#acdf9c' };
    } else if (value >= 36 && value <= 75) {
        return { category: '나빠요', imageSrc: badIcon, backColor: '#ff8484'};
    } else if (value >= 76) {
        return { category: '매우나뻐요', imageSrc: worstIcon, backColor: '#939393' };
    } else if (value === "-" || value === "" || value === undefined) {
        return { category: '정보없음', imageSrc: 'image-path-5' };
    }
}

function SearchResult() {
    const { cityName } = useParams();
    const location = useLocation();
    const searchData = location.state.searchData; // Optional chaining 사용
    
    const airQualityCategory = getCategory(searchData.pm10Value);
    
    useEffect(() => {
        // body의 background 색상 설정
        document.body.style.backgroundColor = airQualityCategory.backColor;
        return () => {
            // 컴포넌트가 언마운트될 때 초기 상태로 복원
            document.body.style.backgroundColor = '';
        };
    }, [airQualityCategory.backColor]);

    if (!searchData) {
        return <Navigate to="/not-found" />; // 데이터가 없는 경우 NotFound 페이지로 리다이렉션
    }

    return (
        <section className='searchresult'>
            <h2 className='searchresult__title'>현재 계신 위치: {cityName}</h2>
            <article className='searchresult__info'>
                <AirQualityWithImage imageSrc={airQualityCategory.imageSrc} alt={airQualityCategory.category} text={airQualityCategory.category} />
                <div className='searchresult__info__bot'>
                    <p>미세먼지: {searchData.pm10Value} µg/m³</p>
                    <p>초미세먼지: {searchData.pm25Value} µg/m³</p>
                </div>
            </article>
            <article className='searchresult__modal'>
                {(airQualityCategory.category === '좋아요' || airQualityCategory.category === '보통이에요') && <GoodAirQuality />}
                {(airQualityCategory.category === '나빠요' || airQualityCategory.category === '매우나뻐요') && <BadAirQuality />}
            </article>
        </section>
    );
}

export default SearchResult;
