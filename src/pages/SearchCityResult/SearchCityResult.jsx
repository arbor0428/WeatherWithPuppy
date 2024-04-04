import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

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

function SearchCityResult() {
    const location = useLocation();
    const searchData = location.state.searchData; // Optional chaining 사용

    if (!searchData) {
        return <Navigate to="/not-found" />; // 데이터가 없는 경우 NotFound 페이지로 리다이렉션
    }

    return (
        <div>
            <h2>{searchData.cityName} 대기 오염 정보</h2>
            <b>{getCategory(searchData.pm10Value)} </b>
            <p>미세먼지: {searchData.pm10Value} µg/m³</p>
            <p>초미세먼지: {searchData.pm25Value} µg/m³</p>
        </div>
    );
}

export default SearchCityResult;
