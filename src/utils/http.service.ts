import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/';
const TOKEN = '';

const http = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`
    }
});

export default http;