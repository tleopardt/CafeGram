import axios from 'axios';

/**
 * Public API connection
 */
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.post['content-type'] = 'application/json';

export const API_CAFEGRAM = axios.create({
    baseURL: 'http://10.0.2.2:8000/'
});
