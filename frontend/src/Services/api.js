import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

// 1. Get all countries
export const getAllCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all countries:', error);
    throw error;
  }
};

// 2. Search country by name
export const searchCountryByName = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/name/${name}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching country "${name}":`, error);
    throw error;
  }
};

// 3. Search countries by currency
export const searchByCurrency = async (currency) => {
  try {
    const response = await axios.get(`${BASE_URL}/currency/${currency}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching by currency "${currency}":`, error);
    throw error;
  }
};

// 4. Search countries by region
export const searchByRegion = async (region) => {
  try {
    const response = await axios.get(`${BASE_URL}/region/${region}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching by region "${region}":`, error);
    throw error;
  }
};

// 5. Filter output by specific fields (dynamic)
export const getCountriesWithFields = async (service, fields = []) => {
  try {
    const fieldsQuery = fields.join(',');
    const response = await axios.get(`${BASE_URL}/${service}?fields=${fieldsQuery}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${service} with fields [${fields.join(', ')}]:`, error);
    throw error;
  }
};

export const getCountryByCode = async (code) => {
  const res = await fetch(`${BASE_URL}/alpha/${code}`);
  return await res.json();
};

  
