import axios from 'axios';

// const BACKEND_URL = `https://damp-fortress-80739.herokuapp.com`;
const REQUEST_TIMEOUT = 10000;

export const createAPI = () => {
  const api = axios.create({
    timeout: REQUEST_TIMEOUT,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
