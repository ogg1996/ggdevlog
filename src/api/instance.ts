import axios from 'axios';

const Instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  validateStatus: status => status < 500
});

export default Instance;
