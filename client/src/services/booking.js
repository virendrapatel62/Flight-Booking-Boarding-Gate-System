import { axios } from "./axios";

function getBookingsByDate(date) {
  const query = new URLSearchParams({
    date: new Date(date).toISOString(),
  }).toString();
  return axios
    .get(`/api/bookings?${query}`)
    .then((response) => response && response.data);
}

function createBooking(data) {
  return axios
    .post(`/api/bookings`, data)
    .then((response) => response && response.data);
}

function getBookingCountByMobile(mobile, date) {
  return axios
    .get(`/api/bookings/${mobile}/${new Date(date).toISOString()}/count`)
    .then((response) => response && response.data);
}

function getListOfBookings() {
  return axios
    .get("/api/bookings/time-optimized-list")
    .then((response) => response.data);
}

export {
  getBookingsByDate,
  createBooking,
  getBookingCountByMobile,
  getListOfBookings,
};
