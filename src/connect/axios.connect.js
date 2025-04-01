import axios from 'axios';

export const AxiosConnect = axios.create({
  baseURL: 'https://farming-social-backend.ue.r.appspot.com/',
  headers: {
    'Content-Type': 'application/json'
  }
});