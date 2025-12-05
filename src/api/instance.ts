import axios from 'axios';

const Instance = axios.create({
  baseURL: '/api',
  withCredentials: true,
  validateStatus: status => status < 500
});

export default Instance;
