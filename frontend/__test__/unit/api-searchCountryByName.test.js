import axios from 'axios';
import { searchCountryByName } from '../../src/Services/api';

jest.mock('axios');

describe('searchCountryByName()', () => {
  it('should search and return country data by name', async () => {
    const mockData = [{ name: { common: 'India' } }];
    axios.get.mockResolvedValue({ data: mockData });

    const result = await searchCountryByName('India');
    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/name/India');
  });

  it('should throw error for invalid country name', async () => {
    axios.get.mockRejectedValue(new Error('404 Not Found'));

    await expect(searchCountryByName('InvalidName')).rejects.toThrow('404 Not Found');
  });
});
