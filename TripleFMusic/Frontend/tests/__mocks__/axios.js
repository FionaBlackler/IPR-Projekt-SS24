const axios = jest.genMockFromModule('axios');
const MockAdapter = require('axios-mock-adapter');

// Create an instance of MockAdapter and configure it
const mockAxios = new MockAdapter(axios);

// Mock methods provided by axios
axios.create = jest.fn(() => axios);
axios.get = jest.fn();
axios.post = jest.fn();
axios.put = jest.fn();
axios.delete = jest.fn();
axios.reset = () => {
  mockAxios.reset();
};

// Export the axios instance
module.exports = axios;