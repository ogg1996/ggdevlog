import axios from 'axios';

const Instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

export default Instance;
