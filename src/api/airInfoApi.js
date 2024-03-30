import axios from 'axios';

const API_URL = "/B552584/ArpltnStatsSvc/getCtprvnMesureSidoLIst";

export const fetchCityNames = async (selectedSido) => {
    try {
        const response = await axios.get(API_URL, {
        params: {
            serviceKey: process.env.REACT_APP_PUBLICDATA_API_KEY,
            returnType: 'json',
            numOfRows: 100,
            pageNo: 1,
            sidoName: selectedSido,
            searchCondition: 'DAILY'
        }
        });
        const cities = response.data.response.body.items.map(item => item.cityName);
        return cities;
    } catch (error) {
        throw error;
    }
};

export const fetchSearchResult = async (selectedCity) => {
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
        return response.data.response.body.items[0];
    } catch (error) {
        throw error;
    }
};
