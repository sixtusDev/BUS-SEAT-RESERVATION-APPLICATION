// Import Statements
import http from "./httpService";
import { apiUrl } from "../config.json";

// Users api end point
const apiEndPoint = apiUrl + "/user";

// Save user function to the database
export function saveUser(payload) {
  return http.post(apiEndPoint, payload);
}
