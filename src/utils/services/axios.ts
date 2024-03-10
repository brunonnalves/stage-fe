/**
 * axios setup to use mock service
 */

import axios from 'axios';
import { BASE_URL } from '../../config/constant';

const axiosServices = axios.create({
  baseURL: BASE_URL,
});

// interceptor for http
axiosServices.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'error')
);

export default axiosServices;
