import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

axios.interceptors.request.use((request) => {
  console.log(`Request Interceptor: ${request.method}: ${request.url}`);
  return request;
});

axios.interceptors.response.use((response) => {
  console.log(`Response Interceptor:`, response && response.data);
  return response;
});

export { axios };
