import React, { useState, useEffect } from 'react';
import { fetchCityNames, fetchSearchResult } from '../../api/airInfoApi';
import { useNavigate } from 'react-router-dom';
import NotFound from '../NotFound';

const sidos = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '세종'];

function SearchWeather() {
    const [error, setError] = useState(null);
    const [cityNames, setCityNames] = useState([]);
    const [selectedSido, setSelectedSido] = useState('서울');
    const [selectedCity, setSelectedCity] = useState('강남구');

    const navigate = useNavigate();

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

    const handleChangeSido = (event) => {
        setSelectedSido(event.target.value);
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

           // console.log('result.cityName');

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
                        {sidos.map(sido => (
                            <option key={sido} value={sido}>{sido}</option>
                        ))}
                    </select>
                </div>
                <div className='searchweather__select'>
                    <label htmlFor="city">시/구 선택: </label>
                    <select id="city" onChange={handleChangeCity}>
                        {cityNames.map((cityName, index) => (
                            <option key={index} value={cityName}>{cityName}</option>
                        ))}
                    </select>
                </div>
                <button className='btn' type="submit">검색</button>
            </form>
        </section>
    );
}

export default SearchWeather;
