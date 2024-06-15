// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080', // Set the base URL to your backend server
});

export default instance;
