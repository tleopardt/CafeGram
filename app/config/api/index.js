import axios from 'axios';

/**
 * Public API connection
 */
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['content-type'] = 'application/json';
axios.defaults.headers.common['Cache-Control'] = 'no-cache';

export const API_CAFEGRAM = axios.create({
    baseURL: 'https://api.npoint.io/'
});