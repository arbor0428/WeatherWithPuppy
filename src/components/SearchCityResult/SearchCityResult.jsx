import React from 'react';

function SearchCityResult({ data }) {
    if (!data) {
        return <div>검색 결과가 없습니다.</div>;
    }

    return (
        <div>
            <h2>{data.cityName} 대기 오염 정보</h2>
            <p>미세먼지: {data.pm10Value} µg/m³</p>
            <p>초미세먼지: {data.pm25Value} µg/m³</p>
        </div>
    );
}

export default SearchCityResult;
