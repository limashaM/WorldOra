import axios from 'axios';
import { getAllCountries } from '../../src/Services/api';

jest.mock('axios');

describe('getAllCountries()', () => {
  it('should fetch all countries successfully', async () => {
    const mockData = [{ name: { common: 'Sri Lanka' } }];
    axios.get.mockResolvedValue({ data: mockData });

    const result = await getAllCountries();
    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/all');
  });

  it('should throw an error when request fails', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    await expect(getAllCountries()).rejects.toThrow('Network Error');
  });
});
