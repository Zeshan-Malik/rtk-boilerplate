import axios from 'axios';
import { baseURL } from '../constants';
const instance = axios.create({
    baseURL: baseURL,
    timeout: 10000, // Adjust the timeout as needed
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;