import React, { useState, useEffect } from 'react';
import { fetchCityNames, fetchSearchResult } from '../../api/airInfoApi';
import { useNavigate } from 'react-router-dom';
import NotFound from '../NotFound';

const sidos = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '세종'];

function SearchWeather() {
    const [error, setError] = useState(null);
    const [cityNames, setCityNames] = useState([]);
    const [selectedSido, setSelectedSido] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        setError(null);
        if (selectedSido !== '') {
            const fetchData = async () => {
                try {
                    const cities = await fetchCityNames(selectedSido);
                    setCityNames(cities);
                    console.log(cities)
                } catch (error) {
                    setError(error);
                }
            };
            fetchData();
        }
    }, [selectedSido]);

    const handleChangeSido = (event) => {
        setSelectedSido(event.target.value);
        setSelectedCity('');
    };

    const handleChangeCity = (event) => {
        setSelectedCity(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        search(selectedCity);
    };

    const search = async (selectedCity) => {
        try {
            const result = await fetchSearchResult(selectedSido, selectedCity);
            const cityName = result.cityName;
            navigate(`/SearchWeather/${cityName}`, { state: { searchData: result } });
        } catch (error) {
            setError(error);
        }
    };

    if (error) {
        return <NotFound error={error} />;
    }

    return (
        <section className='searchweather'>
            <h2 className='searchweather__title'>살고 계신 도시를 선택해주세요!</h2>
            <form onSubmit={handleSearch}>
                <div className='searchweather__select'>
                    <label htmlFor="sido">시/도 선택: </label>
                    <select id="sido" value={selectedSido} onChange={handleChangeSido}>
                        <option value="">시/도를 선택하세요</option>
                        {sidos.map(sido => (
                            <option key={sido} value={sido}>{sido}</option>
                        ))}
                    </select>
                </div>
                <div className='searchweather__select'>
                    <label htmlFor="city">시/구 선택: </label>
                    <select id="city" value={selectedCity} onChange={handleChangeCity}>
                        <option value="">시/구를 선택하세요</option>
                        {cityNames.map((cityName, index) => (
                            <option key={index} value={cityName}>{cityName}</option>
                        ))}
                    </select>
                </div>
                <button className='btn' type="submit" disabled={!selectedCity}>검색</button>
            </form>
        </section>
    );
}

export default SearchWeather;
