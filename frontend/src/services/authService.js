// Import Statements
import http from "./httpService";
import { apiUrl } from "../config.json";

// Auth api end point
const apiEndPoint = apiUrl + "/auth";

// Local storage auth token
const token = "auth-token";

// API call to sign in a user
export function signIn(payload) {
  return http.post(apiEndPoint, payload);
}

// Adds auth token in local storage
export function setToken(jwtToken) {
  localStorage.setItem(token, jwtToken);
}

// Removes auth token in local Storage
export function removeToken() {
  localStorage.removeItem(token);
}

// Get jwt token from local storage
export function getToken() {
  return localStorage.getItem(token);
}
