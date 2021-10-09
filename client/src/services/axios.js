import axios from "axios";
const { REACT_APP_API_HOST } = process.env;

axios.defaults.baseURL = REACT_APP_API_HOST;

axios.interceptors.request.use((request) => {
  console.log(`Request Interceptor: ${request.method}: ${request.url}`);
  return request;
});

axios.interceptors.response.use((response) => {
  console.log(`Response Interceptor:`, response && response.data);
  return response;
});

export { axios };
