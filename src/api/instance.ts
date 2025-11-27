import axios from 'axios';

const Instance = axios.create({
  baseURL: '/api'
});

export default Instance;
