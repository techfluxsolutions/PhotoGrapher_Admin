import axios from 'axios';
import { authorizeMe, axiosInstance, axiosInstanceNoAuth } from './commonHeadApiLogic.js';

// Ensure authorization header is set before making authenticated requests
const withAuthorization = async (apiFunction, ...args) => {
  try {
    await authorizeMe(); // Ensure the Authorization header is set
    return await apiFunction(...args);
  } catch (error) {
    // Handle errors as necessary
    console.error("Error in API request:", error);
    throw error;
  }
};






// UPCOMING
// /api/admins/bookings/upcoming?fromDate=2026-01-15&toDate=2026-12-31



export const getUpcomingBookings = (fromDate, toDate) => {
  return withAuthorization(async () => {
    return axiosInstance.get(`/api/admins/bookings/upcoming?fromDate=${fromDate}&toDate=${toDate}`);
  });
}
// PREVIOUS
// {{local}}/api/admins/bookings/previous?fromDate=2025-01-01&toDate=2026-01-14


export const getPreviousBookings = (fromDate, toDate) => {
  return withAuthorization(async () => {
    return axiosInstance.get( `/api/admins/bookings/previous?fromDate=${fromDate}&toDate=${toDate}`);
  });
}
