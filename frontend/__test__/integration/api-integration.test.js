import axios from 'axios';
import { getAllCountries, searchByRegion } from '../../src/Services/api';

jest.mock('axios'); 

describe('API Integration Tests (Mocked)', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch all countries', async () => {
    const mockData = [{ name: { common: 'Sri Lanka' } }];
    axios.get.mockResolvedValue({ data: mockData });

    const result = await getAllCountries();
    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/all');
  });

  test('should fetch countries by region', async () => {
    const region = 'asia';
    const mockData = [{ name: { common: 'India' } }];
    axios.get.mockResolvedValue({ data: mockData });

    const result = await searchByRegion(region);
    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(`https://restcountries.com/v3.1/region/${region}`);
  });

  test('should return empty array when API returns empty data', async () => {
    axios.get.mockResolvedValue({ data: [] });

    const result = await getAllCountries();
    expect(result).toEqual([]);
    expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/all');
  });

  test('should handle errors in getAllCountries', async () => {
    const mockError = new Error('Network Error');
    axios.get.mockRejectedValue(mockError);

    await expect(getAllCountries()).rejects.toThrow('Network Error');
    expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/all');
  });

  test('should handle errors in getCountriesByRegion', async () => {
    const region = 'europe';
    const mockError = new Error('Server not reachable');
    axios.get.mockRejectedValue(mockError);

    await expect(searchByRegion(region)).rejects.toThrow('Server not reachable');
    expect(axios.get).toHaveBeenCalledWith(`https://restcountries.com/v3.1/region/${region}`);
  });
});