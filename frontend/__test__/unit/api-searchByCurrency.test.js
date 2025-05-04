import axios from 'axios';
import { searchByCurrency } from '../../src/Services/api';

jest.mock('axios');

describe('searchByCurrency()', () => {
  it('should return countries by currency', async () => {
    const mockData = [{ name: { common: 'Japan' } }];
    axios.get.mockResolvedValue({ data: mockData });

    const result = await searchByCurrency('JPY');
    expect(result).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/currency/JPY');
  });
});
