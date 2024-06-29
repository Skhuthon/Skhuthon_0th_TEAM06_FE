import axios from 'axios';

const AxiosBase = axios.create({
  baseURL: 'http://13.125.170.162',
  withCredentials: true, // Send cookies with cross-origin requests if needed
});

export default AxiosBase;

