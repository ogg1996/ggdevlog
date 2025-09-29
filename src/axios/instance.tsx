import axios from 'axios';

const Instance = axios.create({
  baseURL: 'http://localhost:4050'
});

export default Instance;
