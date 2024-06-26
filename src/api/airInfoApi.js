import axios from 'axios';

const API_URL = "https://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureSidoLIst";
const API_KEY = process.env.REACT_APP_PUBLICDATA_API_KEY;

// 시/도별로 numOfRows 값을 설정하는 맵
const numOfRowsMap = {
    서울: 25,   
    부산: 16,  
    대구: 9,
    인천: 10,
    광주: 10,
    대전: 5,
    울산: 5,
    경기: 31,
    강원: 18,
    충북: 11,
    충남: 15,
    전북: 14,
    전남: 22,
    경북: 23,
    경남: 18,
    제주: 2,
    세종: 1
};

// 선택된 시/도에 해당하는 시/구 목록을 가져오는 함수
export const fetchCityNames = async (selectedSido) => {
    try {
        const numOfRows = numOfRowsMap[selectedSido] || 10; // 시/도에 따라 numOfRows 값을 가져오거나 기본값으로 설정
        const params = {
            serviceKey: API_KEY,
            returnType: 'json',
            numOfRows: numOfRows,
            pageNo: 1,
            sidoName: selectedSido,
            searchCondition: 'DAILY'
        };

        const response = await axios.get(API_URL, { params });
        const cities = response.data.response.body.items.map(item => item.cityName);
        
        return cities;

    } catch (error) {
        console.error('시/구 목록을 가져오는 중에 오류가 발생했습니다.');
    }
};

// 선택된 시/구에 해당하는 대기 오염 정보를 가져오는 함수
export const fetchSearchResult = async (selectedSido, selectedCity) => {
    try {
        const params = {
            serviceKey: API_KEY,
            returnType: 'json',
            pageNo: 1,
            sidoName: selectedSido,
            cityName: selectedCity,
            searchCondition: 'DAILY'
        };

        const response = await axios.get(API_URL, { params });
        
        // 가져온 데이터 중에서 해당 sidoName과 cityName에 맞는 정보 추출
        const filteredData = response.data.response.body.items.filter(item => 
            item.sidoName === selectedSido && item.cityName === selectedCity
        );

        // 필터링된 데이터 중 첫 번째 요소 반환
        return filteredData[0];

    } catch (error) {
        console.error('대기 오염 정보를 가져오는 중에 오류가 발생했습니다.', error);
        throw error;
    }
};
