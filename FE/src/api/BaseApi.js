import axios from 'axios';
import Cookies from 'js-cookie';

const TOKEN = Cookies.get('token');

const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_LOCAL_SERVER_API}/api`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
});

export default API;
