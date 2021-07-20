// Import Statements
import http from "./httpService";
import { apiUrl } from "../config.json";

// Trip Schedules api end point
const apiEndPoint = apiUrl + "/trip";

// API call to get all trips from the server
export function getTripSchedules() {
  return http.get(apiEndPoint);
}

// API call to get a trip by id from the server
export function getTripSchedule(tripScheduleId) {
  return http.get(`${apiEndPoint}/${tripScheduleId}`);
}

// API call to get trip schedules with search strings:
// from, to, and date
export function getTripSchedulesByQueryString({ from, to, date }) {
  return http.get(`${apiEndPoint}/search?from=${from}&to=${to}&date=${date}`);
}
