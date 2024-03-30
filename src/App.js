import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchCity from './components/SearchCity/SearchCity';
import SearchCityResult from './components/SearchCityResult/SearchCityResult';

const API_URL = "/B552584/ArpltnStatsSvc/getCtprvnMesureSidoLIst";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [cityNames, setCityNames] = useState([]);
  const [selectedSido, setSelectedSido] = useState('서울'); // 기본값으로 '서울' 설정

  useEffect(() => {
    const fetchCityNames = async () => {
      setError(null);
      setLoading(true);

      try {
        const response = await axios.get(API_URL, {
          params: {
            serviceKey: process.env.REACT_APP_PUBLICDATA_API_KEY,
            returnType: 'json',
            numOfRows: 100,
            pageNo: 1,
            sidoName: selectedSido, // 변경된 sidoName 값 전달
            searchCondition: 'DAILY'
          }
        });
        const cities = response.data.response.body.items.map(item => item.cityName);
        setCityNames(cities);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchCityNames();
  }, [selectedSido]); // selectedSido가 변경될 때마다 다시 불러옴

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const search = async (selectedCity) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          serviceKey: process.env.REACT_APP_PUBLICDATA_API_KEY,
          returnType: 'json',
          numOfRows: 100,
          pageNo: 1,
          sidoName: selectedCity,
          searchCondition: 'DAILY'
        }
      });

      setSearchResult(response.data.response.body.items[0]);
    } catch (error) {
      setError(error);
      setSearchResult(null);
    }
  };

  return (
    <div className="App">
      <h1>대기 오염 정보 검색</h1>
      <SearchCity search={search} cityNames={cityNames} selectedSido={selectedSido} setSelectedSido={setSelectedSido} />
      <SearchCityResult data={searchResult} />
    </div>
  );
}

export default App;
