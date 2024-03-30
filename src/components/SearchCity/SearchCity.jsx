import React from 'react';

const sidos = ['서울', '부산', '대구', '인천', '광주', '대전', '울산', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '세종'];

function SearchCity({ search, cityNames, selectedSido, setSelectedSido }) {
    const handleChangeSido = (event) => {
        setSelectedSido(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        search(selectedSido);
    };

    return (
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
    );
}

export default SearchCity;
