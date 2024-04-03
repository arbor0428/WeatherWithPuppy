import React, { useState, useEffect } from 'react';
import { fetchCityNames, fetchSearchResult } from '../../api/airInfoApi';
import SearchCityResult from '../SearchCityResult/SearchCityResult';
import Notfound from '../NotFound';

const sidos = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '세종'];

function SearchCity() {
    const [error, setError] = useState(null);
    const [searchResult, setSearchResult] = useState(null);
    const [cityNames, setCityNames] = useState([]);
    const [selectedSido, setSelectedSido] = useState('서울'); // 기본값으로 '서울' 설정
    const [showSearchResult, setShowSearchResult] = useState(false); // 검색 결과를 보여줄지 여부

    useEffect(() => {
        setError(null);

        const fetchData = async () => {
        try {
            const cities = await fetchCityNames(selectedSido);
            setCityNames(cities);
        } catch (error) {
            setError(error);
        }
        };

        fetchData();
    }, [selectedSido]);

    const search = async (selectedCity) => {
        try {
        const result = await fetchSearchResult(selectedCity);
            setSearchResult(result);
            setShowSearchResult(true); // 검색 결과를 보여주도록 설정
        } catch (error) {
            setError(error);
            setSearchResult(null);
            setShowSearchResult(false); // 검색 결과를 숨기도록 설정
        }
    };

    if (error) {
        return <Notfound error={error} />;
    }
    
    
    const handleChangeSido = (event) => {
        setSelectedSido(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        search(selectedSido);
    };

    return (
        <>
        <h1>대기 오염 정보 검색</h1>
        <form onSubmit={handleSearch}>
            <label htmlFor="sido">시/도 선택: </label>
            <select id="sido" value={selectedSido} onChange={handleChangeSido}>
                {sidos.map(sido => (
                    <option key={sido} value={sido}>{sido}</option>
                ))}
            </select>
            <label htmlFor="city">시/구 선택: </label>
            <select id="city" onChange={(e) => search(e.target.value)}>
                {cityNames.map((cityName, index) => (
                    <option key={index} value={cityName}>{cityName}</option>
                ))}
            </select>
            <button type="submit">검색</button>
        </form>
        {showSearchResult && <SearchCityResult data={searchResult} />}
        </>
    );
}

export default SearchCity;
