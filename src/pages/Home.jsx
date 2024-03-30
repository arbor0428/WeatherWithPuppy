import React, { useState, useEffect } from 'react';
import { fetchCityNames, fetchSearchResult } from '../api/airInfoApi';
import SearchCity from './SearchCity/SearchCity';
import SearchCityResult from './SearchCityResult/SearchCityResult';
import Notfound from './NotFound'

function Home() {
    const [error, setError] = useState(null);
    const [searchResult, setSearchResult] = useState(null);
    const [cityNames, setCityNames] = useState([]);
    const [selectedSido, setSelectedSido] = useState('서울'); // 기본값으로 '서울' 설정

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
        } catch (error) {
            setError(error);
            setSearchResult(null);
        }
    };

    if (error) {
        return <Notfound error={error} />; // 에러 페이지로 전환
    }

    return (
        <div className="App">
            <h1>대기 오염 정보 검색</h1>
            <SearchCity search={search} cityNames={cityNames} selectedSido={selectedSido} setSelectedSido={setSelectedSido} />
            <SearchCityResult data={searchResult} />
        </div>
    );
}

export default Home;
